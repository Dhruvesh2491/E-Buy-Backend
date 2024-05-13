const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/get-Data", userController.getData);
router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.post("/resetPassword", userController.resetPassword);
router.patch("/editProfile/:userId", userController.editProfile);
router.get("/email-exists", userController.emailExists);

module.exports = router;
