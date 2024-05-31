const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const auth = require("../middleware/auth");

router.post("/add-cartitem", auth, cartController.addItem);
router.get("/cartitem", auth, cartController.getItems);
router.delete("/remove-cartitem/:productId", auth, cartController.removeItem);

module.exports = router;
