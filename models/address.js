const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    houseNo: {
        type: String,
        required: true
    },
    societyName: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
   
});

const Address = mongoose.model("Address", addressSchema);
module.exports = { Address };
