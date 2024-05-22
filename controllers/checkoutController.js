const { Checkout } = require("../models/checkout");

const checkout = async (req, res) => {
  try {
    const { houseNo, societyName, landmark, city, state, pincode } = req.body;
    if (!houseNo || !societyName || !city || !state || !pincode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = new Checkout({
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

const getCheckoutData = async (req, res) => {
  try {
    const checkout = await Checkout.find();
    res.status(200).json(checkout);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

const editAddress = async (req, res) => {
  try {
    const checkoutId = req.params.id;
    const updateData = req.body;
    const checkout = await Checkout.findById(checkoutId);

    if (!checkout) {
      return res.status(404).json({ message: "Product not found" });
    }

    Object.assign(checkout, updateData);

    const updatedAddress = await checkout.save();

    res
      .status(200)
      .json({ message: "Product updated successfully", updatedAddress });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { checkout, getCheckoutData, editAddress };
