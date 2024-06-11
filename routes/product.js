const express = require("express");
const router = express.Router();

const addProductController = require("../controllers/productControllers/addProduct");
const editProductController = require("../controllers/productControllers/editProduct");
const getProductController = require("../controllers/productControllers/getProduct");
const deleteProductController = require("../controllers/productControllers/deleteProduct");
const filterProductController = require("../controllers/productControllers/filterProduct");
const remainingProductQuantityController = require("../controllers/productControllers/getRemaningQuantity");
const productQuantityController = require("../controllers/productControllers/productQuntity");

router.post("/add-product", addProductController.createProduct);
router.patch("/editProduct/:id", editProductController.editProduct);
router.get("/product-data", getProductController.getProduct);
router.get("/productId/:id", getProductController.getProductById);
router.delete("/deleteProduct/:id", deleteProductController.deleteProduct);
router.get("/search", filterProductController.searchProducts);
router.get("/filter", filterProductController.filterProducts);
router.get("/images/:id", getProductController.getImageById);
router.get("/remaining-quantity/:id", remainingProductQuantityController.getRemainingQuantity);
router.patch(
  "/increaseQuantity/:id",
  productQuantityController.increaseProductQuantity
);
router.patch(
  "/decreaseQuantity/:id",
  productQuantityController.decreaseProductQuantity
);

module.exports = router;
