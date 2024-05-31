const { Wishlist } = require("../models/wishlist");

const addWishlistItem = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let wishlist = await Wishlist.findOne({ userId: req.user._id });
    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.user._id, items: [] });
    }
    const itemIndex = wishlist.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      wishlist.items[itemIndex].quantity += quantity;
    } else {
      wishlist.items.push({ productId, quantity });
    }
    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error });
  }
};

const getWishlistItems = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );
    if (!wishlist) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items", error });
  }
};

const removeWishlistItem = async (req, res) => {
  const { productId } = req.params;
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user._id });
    if (!wishlist) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = wishlist.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      wishlist.items.splice(itemIndex, 1);
      await wishlist.save();
      res.status(200).json({ message: "Item removed successfully", wishlist });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error during removing item from cart:", error);
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};

module.exports = { addWishlistItem, getWishlistItems, removeWishlistItem };
