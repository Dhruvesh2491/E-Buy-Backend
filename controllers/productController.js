const Product = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, images, category } = req.body;
    const product = new Product({
      name,
      description,
      price,
      images,
      category,
    });
    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createProduct };
