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

    module.exports = router;
