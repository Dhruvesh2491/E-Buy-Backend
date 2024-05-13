const joi = require("joi");

const signupValidationSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  role: joi.string().valid("Admin", "User"),
  contactNumber: joi.number().required(),
  password: joi.string().min(8).required(),
});

const signInValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const resetPasswordValidations = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

const editProfileValidation = joi.object({
  name: joi.string(),
  email: joi.string().email(),
  contactNumber: joi.string(),
});

module.exports = {
  signupValidationSchema,
  signInValidation,
  resetPasswordValidations,
  editProfileValidation
};
