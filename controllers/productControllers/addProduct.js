const { Product } = require("../../models/product");

const createProduct = async (req, res) => {
  try {
    const {
      displayName,
      modelName,
      brandName,
      description,
      quantity,
      price,
      category,
      subcategory,
      image,
    } = req.body;
    if (
      !displayName ||
      !modelName ||
      !brandName ||
      !description ||
      !price ||
      !quantity ||
      !category ||
      !subcategory ||
      !image
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const imageBuffer = Buffer.from(image.split(",")[1], "base64");

    const product = new Product({
      displayName,
      modelName,
      brandName,
      description,
      price,
      quantity,
      remainingQuantity: quantity, // Initialize remainingQuantity with quantity
      category,
      subcategory,
      image: imageBuffer.toString("base64"),
    });

    await product.save();

    // Send the Base64 URL in the response
    const responseData = {
      message: "Product added successfully",
      product: {
        ...product.toObject(),
        image: `data:image/jpeg;base64,${product.image}`,
      },
    };

    res.status(201).json(responseData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createProduct };
