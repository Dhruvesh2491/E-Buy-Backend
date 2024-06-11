const { Wishlist } = require("../../models/wishlist");

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

module.exports = { addWishlistItem };
