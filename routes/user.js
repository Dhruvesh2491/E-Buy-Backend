const express = require("express");
const router = express.Router();

const signupController = require("../controllers/userControllers/signup")
const signinController = require("../controllers/userControllers/signin")
const userDataController = require("../controllers/userControllers/userdata")
const resetpasswordController = require("../controllers/userControllers/resetpassword")
const editProfileController = require("../controllers/userControllers/editprofile")

router.post("/signup",signupController.signUp)
router.post("/signin",signinController.signIn)
router.post("/resetpassword",userDataController.getData)
router.get("/get-Data",resetpasswordController.resetPassword)
router.patch("/editProfile/:userId",editProfileController.editProfile)

module.exports = router;