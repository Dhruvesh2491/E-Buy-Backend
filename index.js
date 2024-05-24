const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const addressRouter = require("./routes/address");
const paymentRouter = require("./routes/payment")
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();
app.use(cors("http://localhost:3000"));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/profile", userRouter);
app.use("/product", productRouter);
app.use("/checkout", addressRouter);
app.use("/payment", paymentRouter);

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
