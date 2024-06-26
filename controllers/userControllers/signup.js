const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { User } = require("../../models/user");
const {
  signupValidationSchema,
} = require("../../validation/user");
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

const signUp = async (req, res) => {
  try {
    const { error } = signupValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).send({ error: "User is Already Exists." });
    }

    if (req.body.contactNumber.toString().length !== 10) {
      return res.status(400).send({
        message: "Mobile number should be 10 digits long.",
        options: ["Admin", "User"],
      });
    }

    let role = req.body.role;
    if (!["Admin", "User"].includes(role)) {
      return res
        .status(400)
        .send({ message: "Invalid role. Choose either 'Admin' or 'User'." });
    }
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      role: role,
      contactNumber: req.body.contactNumber,
      password: hashedPassword,
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: req.body.email,
      subject: "Welcome to Stock Management",
      text: "Welcome to Stock Management! Thank you for signing up.",
    };

    await transporter.sendMail(mailOptions);

    await newUser.save();

    res.status(200).send({ message: "User Registration Successful." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = { signUp };