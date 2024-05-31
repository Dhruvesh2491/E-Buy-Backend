const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const auth = require("../middleware/auth");

router.post("/add-wishlistitem", auth, wishlistController.addWishlistItem);
router.get("/wishlistitem", auth, wishlistController.getWishlistItems);
router.delete("/remove-wishlistitem/:productId", auth, wishlistController.removeWishlistItem);

module.exports = router;
