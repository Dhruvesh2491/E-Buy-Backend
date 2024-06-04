const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const auth = require("../middleware/auth");

router.post("/checkout", paymentController.checkout);
router.post("/payment-verification", auth, paymentController.paymentVerification); // Apply auth middleware here
router.get("/getkey", paymentController.razorKey);
router.get("/orders", auth, paymentController.getUserOrders);

module.exports = router;
