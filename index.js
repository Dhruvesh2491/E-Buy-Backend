const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const profileRouter = require("./routes/product");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use("/profile", userRouter);
app.use("/product", profileRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/E-Buy", {
  })
  .then(() => {
    console.log("Connected Successfull");
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
