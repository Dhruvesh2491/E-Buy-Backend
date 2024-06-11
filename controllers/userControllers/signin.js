const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const { signInValidation } = require("../../validation/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signIn = async (req, res) => {
  try {
    const { error } = signInValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({ error: "User does not exist." });
    }

    const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(400).send({ error: "Password is incorrect." });
    }

    const tokenPayload = {
      _id: user._id,
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      contactNumber: user.contactNumber,
    };

    const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(200).send({
      message: "User login successful.",
      Token: token,
      User: tokenPayload,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong." });
  }
};

module.exports = { signIn };
