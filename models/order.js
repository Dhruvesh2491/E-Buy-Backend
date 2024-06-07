const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  payment_id: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  products: [
    {
      _id: String,
      displayName: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };