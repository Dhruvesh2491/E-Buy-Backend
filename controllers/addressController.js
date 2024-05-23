const { Address } = require("../models/address");

const address = async (req, res) => {
  try {
    const { houseNo, societyName, landmark, city, state, pincode } = req.body;
    if (!houseNo || !societyName || !city || !state || !pincode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = new Address({
      houseNo,
      societyName,
      landmark,
      city,
      state,
      pincode,
    });

    const address = await product.save();

    res.status(200).send({ message: "Address Added Successfully", address });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAddressData = async (req, res) => {
  try {
    const address = await Address.find();
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

const editAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const updateData = req.body;
    const address = await Address.findById(addressId);

    if (!address) {
      return res.status(404).json({ message: "Product not found" });
    }

    Object.assign(address, updateData);

    const updatedAddress = await address.save();

    res
      .status(200)
      .json({ message: "Product updated successfully", updatedAddress });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { address, getAddressData, editAddress };
