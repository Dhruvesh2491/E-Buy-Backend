const { Product } = require("../../models/product");

const searchProducts = async (req, res) => {
  try {
    const productName = req.query.name;
    const products = await Product.find({
      displayName: { $regex: new RegExp(productName, "i") },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const filterProducts = async (req, res) => {
  try {
    const filters = {};

    if (req.query.subcategory) {
      filters.subcategory = req.query.subcategory;
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filters.price = {};
      if (req.query.minPrice) {
        filters.price.$gte = parseFloat(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        filters.price.$lte = parseFloat(req.query.maxPrice);
      }
    }

    if (req.query.brandName) {
      filters.brandName = req.query.brandName;
    }

    const products = await Product.find(filters);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { searchProducts, filterProducts };
