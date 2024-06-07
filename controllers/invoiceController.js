const { Order } = require("../models/order");

const getInvoiceDetails = async (req, res) => {
    try {
      const orderId = req.params.orderId; // Ensure order ID is correctly retrieved
      const order = await Order.findOne({
        order_id: orderId,
        user_id: req.user._id,
      });
  
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      // If the order is found, construct the invoice details and send the response
      const invoiceDetails = {
        invoiceNo: order.order_id,
        name: req.user.name,
        email: req.user.email,
        contactNumber: req.user.contactNumber,
        orderDate: order.orderDate,
        products: order.products,
        totalPrice: order.products.reduce(
          (acc, product) => acc + product.price * product.quantity,
          0
        ),
      };
  
      res.status(200).json({ success: true, invoice: invoiceDetails });
    } catch (error) {
      console.error("Error fetching invoice details:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  module.exports = { getInvoiceDetails };