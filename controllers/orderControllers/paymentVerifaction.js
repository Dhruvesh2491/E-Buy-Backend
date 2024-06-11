const dotenv = require("dotenv");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
dotenv.config();
const { Order } = require("../../models/order");
const { format, addDays } = require("date-fns");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const paymentVerification = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      products,
    } = req.body;

    if (!req.user) {
      throw new Error("User not authenticated");
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const newOrder = new Order({
        user_id: req.user._id,
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        orderDate: new Date(),
        products,
      });

      await newOrder.save();
      const deliveryDate = format(addDays(new Date(), 2), "MM/dd/yyyy");

      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: req.user.email,
        subject: "Order Confirmed",
        text: `Thank you for choosing our site for ordering your product. Your order will be delivered by ${deliveryDate}.`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Payment verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid signature" });
    }
  } catch (error) {
    console.error(
      "Error during payment verification:",
      error.message,
      error.stack
    );
    res.status(500).send({
      error: "Error during payment verification",
      details: error.message,
    });
  }
};
module.exports = { paymentVerification };
