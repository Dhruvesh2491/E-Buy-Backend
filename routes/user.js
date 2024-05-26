const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")

router.post("/signup",userController.signUp)
router.post("/signin",userController.signIn)
router.post("/resetpassword",userController.resetPassword)
router.get("/get-Data",userController.getData)
router.patch("/editProfile/:userId",userController.editProfile)

module.exports = router;