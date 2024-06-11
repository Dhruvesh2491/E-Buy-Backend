const { Address } = require("../../models/address");

const addAddress = async (req, res) => {
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

module.exports = { addAddress };
