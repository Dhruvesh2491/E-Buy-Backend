const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { User } = require("../models/user");
const {
  signupValidationSchema,
  signInValidation,
  resetPasswordValidations,
  editProfileValidation,
} = require("../validation/user");
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

const getData = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

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

const emailExists = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.query.email });
    if (user) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const signIn = async (req, res) => {
  try {
    const { error } = signInValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({ error: "User is Not Exists." });
    }

    const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(400).send({ error: "Password is Incorrect" });
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
      message: "User Login Successfully",
      Token: token,
      User: tokenPayload,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something Went Wrong" });
  }
};

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
      text: `Your Password has been changed. here is your new password : ${req.body.password}`
    };

    await transporter.sendMail(mailOptions);

    await user.save();

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

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
    await user.save();
    res.status(200).send({ message: "Profile Data Updated Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = {
  signUp,
  getData,
  signIn,
  resetPassword,
  editProfile,
  emailExists
};
