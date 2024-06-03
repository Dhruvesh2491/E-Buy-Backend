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


const updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    
    // Ensure the product ID is in the correct format for comparison
    const formattedProductId = new mongoose.Types.ObjectId(productId);
    
    // Attempt to find the item in the cart
    const item = cart.items.find(item => item.productId.equals(formattedProductId));
    
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    
    // Update the quantity for the found item
    item.quantity = quantity;
    await cart.save();
    
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating item quantity:", error);
    res.status(500).json({ message: "Error updating item quantity", error: error.message });
  }
};



module.exports = { addItem, getItems, removeItem , updateQuantity };
