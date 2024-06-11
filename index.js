const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const addressRouter = require("./routes/address");
const paymentRouter = require("./routes/order");
const cartRouter = require('./routes/cart');
const wishlistRouter = require('./routes/wishlist');
const invoiceRouter = require('./routes/invoice');
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/profile", userRouter);
app.use("/product", productRouter);
app.use("/address", addressRouter);
app.use("/payment", paymentRouter);
app.use('/cart', cartRouter);
app.use('/wishlist', wishlistRouter);
app.use('/invoice', invoiceRouter);

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
