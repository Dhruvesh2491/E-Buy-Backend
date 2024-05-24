const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/checkout", paymentController.checkout);
router.post("/payment-verification", paymentController.paymentVerification);
router.get("/getkey", paymentController.razorKey);

module.exports = router;
