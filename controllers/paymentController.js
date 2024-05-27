const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const crypto = require("crypto");
dotenv.config();
const { Order } = require("../models/order");

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_SECRET,
});

const checkout = async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    if (!amount) {
      throw new Error("Amount is required and should be a valid number.");
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);
    console.log("Order created successfully:", order);

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error.message, error.stack);
    res.status(500).send({ error: "Error creating order", details: error.message });
  }
};

const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, products } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const newOrder = new Order({
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        orderDate: new Date(),
        products,
      });

      await newOrder.save();

      res.status(200).json({ message: "Payment verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Error during payment verification:", error.message, error.stack);
    res.status(500).send({ error: "Error during payment verification", details: error.message });
  }
};

const razorKey = async (req, res) => {
  try {
    res.status(200).json({ key: process.env.RAZOR_KEY_ID });
  } catch (error) {
    res.status(500).send({ error: "Error getting Razorpay key", details: error.message });
  }
};



module.exports = { checkout, paymentVerification, razorKey };
