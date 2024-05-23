const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const addressRouter = require("./routes/address");
const dotenv = require("dotenv");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51PJUIzSFpYIDMRdfSm6WVWRmYyp2E4lxdJ0mEWklzRwdgdMf9IPteYUxqaO4ygk9KJDnxZN38bFo3JyfYfy3EOPW00KT412yez"
);

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/profile", userRouter);
app.use("/product", productRouter);
app.use("/checkout", addressRouter);

app.post("/create-checkout-session", async (req, res) => {
  console.log("Received request to /create-checkout-session", req.body);
  
  const { products } = req.body;
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.displayName,
      },
      unit_amount: product.price * 100,
    },
    quantity: 1,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:3000/order`,
      cancel_url: `http://localhost:3000/cancel`,
    });

    console.log("Created checkout session:", session);
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/E-Buy", {})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
