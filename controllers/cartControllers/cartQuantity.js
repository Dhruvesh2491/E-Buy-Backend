const { default: mongoose } = require("mongoose");
const { Cart } = require("../../models/cart");

const increaseQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const formattedProductId = new mongoose.Types.ObjectId(productId);
    const item = cart.items.find((item) =>
      item.productId.equals(formattedProductId)
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity += quantity;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error increasing item quantity:", error);
    res.status(500).json({
      message: "Error increasing item quantity",
      error: error.message,
    });
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
    const item = cart.items.find((item) =>
      item.productId.equals(formattedProductId)
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity -= quantity;
    if (item.quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity cannot be less than 1" });
    }

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error decreasing item quantity:", error);
    res.status(500).json({
      message: "Error decreasing item quantity",
      error: error.message,
    });
  }
};

module.exports = { increaseQuantity, decreaseQuantity };
