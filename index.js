const express = require("express")
const mongoose = require("mongoose")
const userRouter = require("./routes/user")
require("dotenv").config()

const port = 4000
const app = express()

mongoose.connect(process.env.MONGODB_PATH)
.then(()=>{
    console.log("Connection Success");
})
.catch(()=>{
    console.log("Connection Failed");
})


app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})