const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    houseNo : {
        type:String,
        required:true
    },
    societyName:{
        type:String,
        required:true
    },
    landmark:{
        type:String,
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    }
})

const Checkout = mongoose.model("Address",addressSchema)
module.exports = { Checkout }