const { Address } = require("../models/address");

const address = async (req, res) => {
  try {
    const { houseNo, societyName, landmark, city, state, pincode } = req.body;
    const userId = req.user._id; 

    if (!houseNo || !societyName || !landmark || !city || !state || !pincode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAddress = new Address({
      houseNo,
      societyName,
      landmark,
      city,
      state,
      pincode,
      user: userId,
    });

    const address = await newAddress.save();

    res.status(200).send({ message: "Address Added Successfully", address });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAddressData = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user is populated by the authentication middleware
    const address = await Address.find({ user: userId });
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const updateData = req.body;
    const address = await Address.findOne({ _id: addressId, user: req.user._id });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    Object.assign(address, updateData);

    const updatedAddress = await address.save();

    res.status(200).json({ message: "Address updated successfully", updatedAddress });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { address, getAddressData, editAddress };
