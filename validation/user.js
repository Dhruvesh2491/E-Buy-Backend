const joi = require("joi");

const signupValidationSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  contactNumber: joi.number().required(),
  password: joi.string().min(8).required(),
  confirmPassword: joi.string().min(8).valid(joi.ref("password")).required(),
  role: joi.string().valid("admin", "user"),
});

module.exports = signupValidationSchema;
