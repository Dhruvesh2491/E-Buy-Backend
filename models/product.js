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
  // remainingQuantity: {
  //   type: Number,
  //   required: true,
  // },
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
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
