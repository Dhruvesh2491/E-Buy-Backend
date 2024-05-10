const Product = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, images, category } = req.body;
    const product = new Product({
      name,
      brand,
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

const getProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
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

const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;
    const options = { new: true }; // to return the updated product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updates,
      options
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
      name: { $regex: new RegExp(productName, 'i') }
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
    if (req.query.brand) {
      filters.brand = req.query.brand;
    }
    if (req.query.size) {
      filters.size = req.query.size;
    }
    if (req.query.minPrice && req.query.maxPrice) {
      filters.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
    } else if (req.query.minPrice) {
      filters.price = { $gte: req.query.minPrice };
    } else if (req.query.maxPrice) {
      filters.price = { $lte: req.query.maxPrice };
    }
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
  updateProductById,
  deleteProductById,
  searchProducts,
  filterProducts,
};
