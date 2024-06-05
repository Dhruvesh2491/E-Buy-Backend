const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const auth = require("../middleware/auth");

router.post("/checkout", paymentController.checkout);
router.post("/payment-verification", auth, paymentController.paymentVerification);
router.get("/getkey", paymentController.razorKey);
router.get("/orders", auth, paymentController.getUserOrders);
router.delete("/delete-order", auth, paymentController.deleteOrder);

module.exports = router;
