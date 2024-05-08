const express = require("express")
const mongoose = require("mongoose")
const port = 4000

const app = express()

mongoose.connect("mongodb://127.0.0.1:27017/E-Buy")
.then(()=>{
    console.log("Connection Success");
})
.catch(()=>{
    console.log("Connection Failed");
})


app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})