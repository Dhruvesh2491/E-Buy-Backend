const { Address } = require("../../models/address");

const getAddressData = async (req, res) => {
  try {
    const userId = req.user._id;
    const address = await Address.find({ user: userId });
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getAddressData };
