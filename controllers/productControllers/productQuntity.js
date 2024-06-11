const { Product } = require("../../models/product");

const increaseProductQuantity = async (req, res) => {
  try {
    const productId = req.params.id;
    const { quantityToAdd } = req.body;

    if (!quantityToAdd || isNaN(quantityToAdd)) {
      return res
        .status(400)
        .json({ message: "Quantity to add must be a number" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.quantity += parseInt(quantityToAdd);
    product.remainingQuantity += parseInt(quantityToAdd);

    await product.save();

    res.status(200).json({
      message: "Product quantity increased successfully",
      product: {
        ...product.toObject(),
        image: `data:image/jpeg;base64,${product.image}`,
      },
    });
  } catch (error) {
    console.error("Error increasing product quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const decreaseProductQuantity = async (req, res) => {
  try {
    const productId = req.params.id;
    const { quantityToSubtract } = req.body;

    if (!quantityToSubtract || isNaN(quantityToSubtract)) {
      return res
        .status(400)
        .json({ message: "Quantity to subtract must be a number" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.remainingQuantity < parseInt(quantityToSubtract)) {
      return res
        .status(400)
        .json({ message: "Insufficient quantity available" });
    }

    // Update product quantity
    product.quantity -= parseInt(quantityToSubtract);
    product.remainingQuantity -= parseInt(quantityToSubtract);

    await product.save();

    res.status(200).json({
      message: "Product quantity decreased successfully",
      product: {
        ...product.toObject(),
        image: `data:image/jpeg;base64,${product.image}`,
      },
    });
  } catch (error) {
    console.error("Error decreasing product quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { increaseProductQuantity, decreaseProductQuantity };
