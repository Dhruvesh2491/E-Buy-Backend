const { User } = require("../../models/user");
const { editProfileValidation } = require("../../validation/user");

const editProfile = async (req, res) => {
  try {
    const { error } = editProfileValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.contactNumber) {
      user.contactNumber = req.body.contactNumber;
    }
    if (req.body.role) {
      user.role = req.body.role; // Handle role update
    }
    await user.save();
    res.status(200).send({ message: "Profile Data Updated Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = { editProfile };