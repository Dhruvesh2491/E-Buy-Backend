const { Order } = require("../../models/order");

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      throw new Error("Order ID is required.");
    }

    const order = await Order.findOneAndDelete({
      order_id: orderId,
      user_id: req.user._id,
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully." });
  } catch (error) {
    console.error("Error deleting order:", error.message, error.stack);
    res
      .status(500)
      .send({ error: "Error deleting order", details: error.message });
  }
};

module.exports = { deleteOrder };
