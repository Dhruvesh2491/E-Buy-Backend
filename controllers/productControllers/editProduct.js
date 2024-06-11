const { Product } = require("../../models/product");

const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    Object.assign(product, updateData);

    if (updateData.quantity !== undefined) {
      product.remainingQuantity = updateData.quantity; // Reset remainingQuantity to quantity
    }

    await product.save();

    const responseData = {
      message: "Product Edited successfully",
      product: {
        ...product.toObject(),
        image: `data:image/jpeg;base64,${product.image}`,
      },
    };

    res.status(201).json(responseData);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { editProduct };
