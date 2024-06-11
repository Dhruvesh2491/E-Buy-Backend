const { Address } = require("../../models/address");

const editAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const updateData = req.body;
    const address = await Address.findOne({
      _id: addressId,
      user: req.user._id,
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    Object.assign(address, updateData);

    const updatedAddress = await address.save();

    res
      .status(200)
      .json({ message: "Address updated successfully", updatedAddress });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { editAddress };
