const express = require("express");
const router = express.Router();
const { signUp, getData, signIn, resetPassword, editProfile } = require("../controllers/userController");

router.get("/get-Data", getData);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/resetPassword", resetPassword);
router.patch("/editProfile/:userId", editProfile);

module.exports = router;
