const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");

router.post("/add-address", checkoutController.checkout);
router.get("/get-address-data", checkoutController.getCheckoutData);
router.patch("/edit-address/:id", checkoutController.editAddress);

module.exports = router;
