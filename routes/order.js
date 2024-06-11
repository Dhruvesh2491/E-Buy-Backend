const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const paymentCheckoutController = require("../controllers/orderControllers/checkout");
const paymentVerificationController = require("../controllers/orderControllers/paymentVerifaction");
const getRazorkeyController = require("../controllers/orderControllers/razorkey");
const getUserOrderController = require("../controllers/orderControllers/getUserOrder");
const deleteOrderController = require("../controllers/orderControllers/deleteorder");

router.post("/checkout", paymentCheckoutController.checkout);
router.post(
  "/payment-verification",
  auth,
  paymentVerificationController.paymentVerification
);
router.get("/getkey", getRazorkeyController.razorKey);
router.get("/orders", auth, getUserOrderController.getUserOrders);
router.delete("/delete-order", auth, deleteOrderController.deleteOrder);

module.exports = router;
