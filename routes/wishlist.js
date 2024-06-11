const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const addWishlistItemController = require("../controllers/wishlistController/addWishlistItem");
const getWishlistItemController = require("../controllers/wishlistController/getWishlistItem");
const removeWishlistItemController = require("../controllers/wishlistController/removeWishlistItem");

router.post("/add-wishlistitem", auth, addWishlistItemController.addWishlistItem);
router.get("/wishlistitem", auth, getWishlistItemController.getWishlistItems);
router.delete("/remove-wishlistitem/:productId", auth, removeWishlistItemController.removeWishlistItem);

module.exports = router;
