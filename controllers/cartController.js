const { Cart } = require("../models/cart");
const mongoose = require("mongoose");

const addItem = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error });
  }
};

const getItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items", error });
  }
};

const removeItem = async (req, res) => {
  const { productId } = req.params;
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      res.status(200).json({ message: "Item removed successfully", cart });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error during removing item from cart:", error);
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};

const increaseQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const formattedProductId = new mongoose.Types.ObjectId(productId);
    const item = cart.items.find(item => item.productId.equals(formattedProductId));

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity += quantity;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error increasing item quantity:", error);
    res.status(500).json({ message: "Error increasing item quantity", error: error.message });
  }
};

const decreaseQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const formattedProductId = new mongoose.Types.ObjectId(productId);
    const item = cart.items.find(item => item.productId.equals(formattedProductId));

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity -= quantity;
    if (item.quantity < 1) {
      return res.status(400).json({ message: "Quantity cannot be less than 1" });
    }

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error decreasing item quantity:", error);
    res.status(500).json({ message: "Error decreasing item quantity", error: error.message });
  }
};

module.exports = { addItem, getItems, removeItem, increaseQuantity, decreaseQuantity };
