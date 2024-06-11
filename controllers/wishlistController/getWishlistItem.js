const { Wishlist } = require("../../models/wishlist");

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

module.exports = { getWishlistItems };
