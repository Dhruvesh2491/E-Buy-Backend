const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/add-product", productController.createProduct);
router.patch("/editProduct/:id", productController.editProduct);
router.get("/product-data", productController.getProduct);
router.get("/productId/:id", productController.getProductById);
router.delete("/deleteProduct/:id", productController.deleteProductById);
router.get("/search", productController.searchProducts);
router.get("/filter", productController.filterProducts);
router.get("/images/:id", productController.getImageById);
router.get("/remaining-quantity/:id", productController.getRemainingQuantity);
router.patch("/increaseQuantity/:id", productController.increaseProductQuantity);
router.patch("/decreaseQuantity/:id", productController.decreaseProductQuantity);


module.exports = router;
