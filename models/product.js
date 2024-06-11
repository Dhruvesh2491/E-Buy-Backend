const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  modelName: {
    type: String,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Store binary image data
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: () => Math.floor(Math.random() * 5) + 1, // Generate random rating between 1 and 5
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
