const Product = require("../models/product");
const fs = require("fs");

const createProduct = async (req, res) => {
  try {
    const { displayName, modelName, brandName, description, price, category, subcategory } = req.body;
    const product = new Product({
      displayName,
      modelName,
      brandName,
      description,
      price,
      category,
      subcategory,
      image: req.file.path,
    });
    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if there's a new image
    if (req.file) {
      // Remove the old image file if it exists and is defined
      if (product.image && fs.existsSync(product.image)) {
        fs.unlinkSync(product.image);
      }
      // Set the new image path
      updateData.image = req.file.path;
    }

    // Update the product using findByIdAndUpdate method
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const searchProducts = async (req, res) => {
  try {
    const productName = req.query.name;
    const products = await Product.find({
      displayName: { $regex: new RegExp(productName, 'i') }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const filterProducts = async (req, res) => {
  try {
    const filters = {};
    if (req.query.category) {
      filters.category = req.query.category;
    }
    // Add other filter conditions as required
    const products = await Product.find(filters);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  getProduct,
  getProductById,
  editProduct,
  deleteProductById,
  searchProducts,
  filterProducts,
};
