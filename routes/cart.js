const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const addItemController = require("../controllers/cartControllers/addItem");
const getItemController = require("../controllers/cartControllers/getItem");
const removeItemController = require("../controllers/cartControllers/removeItem");
const cartQuantityController = require("../controllers/cartControllers/cartQuantity");
const discountPriceController = require("../controllers/cartControllers/discountPrice");

router.post("/add-cartitem", auth, addItemController.addItem);
router.get("/cartitem", auth, getItemController.getItems);
router.delete(
  "/remove-cartitem/:productId",
  auth,
  removeItemController.removeItem
);
router.patch(
  "/increase-quantity",
  auth,
  cartQuantityController.increaseQuantity
);
router.patch(
  "/decrease-quantity",
  auth,
  cartQuantityController.decreaseQuantity
);
router.post(
  "/calculate-discount",
  auth,
  discountPriceController.calculateDiscount
);

module.exports = router;
