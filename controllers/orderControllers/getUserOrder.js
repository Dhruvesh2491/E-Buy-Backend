const { Order } = require("../../models/order");

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user._id });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error getting user orders:", error.message, error.stack);
    res
      .status(500)
      .send({ error: "Error getting user orders", details: error.message });
  }
};

module.exports = { getUserOrders };
