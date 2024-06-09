const { Order } = require('../models/order');
const { calculateDiscount } = require('./cartController'); // Adjust path as necessary

const generateInvoice = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const couponCode = req.query.couponCode; // Assuming coupon code is passed as a query parameter
    const order = await Order.findById(orderId).populate('user_id');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Extract order details
    const {
      user_id: { name, email, contactNumber },
      orderDate,
      products
    } = order;

    const invoiceData = {
      invoiceNo: orderId, // Using orderId as invoice number
      name,
      email,
      contactNumber,
      orderDate,
      products,
      // Assuming fixed tax rates for example
      cgst: 9,
      sgst: 9,
      totalGst: 18,
    };

    // Calculate total price and total GST
    let totalPrice = 0;
    products.forEach(product => {
      totalPrice += product.price * product.quantity;
    });
    const totalGST = totalPrice * (invoiceData.totalGst / 100);
    const totalPriceWithGST = totalPrice + totalGST;

    let discountPrice = totalPriceWithGST;

    // Apply discount if coupon code is provided
    if (couponCode) {
      const discountResponse = await calculateDiscount({
        totalPrice: totalPriceWithGST,
        couponCode
      });
      if (discountResponse.success) {
        discountPrice = discountResponse.discountedPrice;
      } else {
        return res.status(400).json({ message: discountResponse.message });
      }
    }

    const invoice = {
      ...invoiceData,
      totalPrice,
      totalGST,
      totalPriceWithGST,
      discountPrice: discountPrice.toFixed(2),
    };

    res.status(200).json({ success: true, invoice });
  } catch (error) {
    console.error('Error generating invoice:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { generateInvoice };
