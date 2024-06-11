const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { User } = require("../../models/user");
const { resetPasswordValidations } = require("../../validation/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
const resetPassword = async (req, res) => {
  try {
    const { error } = resetPasswordValidations.validate(req.body);
    if (error) {
      res.status(400).send({ error: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).send({ message: "User not found." });
    }
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    user.password = hashedPassword;

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: req.body.email,
      subject: "Welcome to Stock Management",
      text: `Your Password has been changed. here is your new password : ${req.body.password}`,
    };

    await transporter.sendMail(mailOptions);

    await user.save();

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = { resetPassword };
