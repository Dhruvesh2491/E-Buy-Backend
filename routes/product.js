const express = require("express");
const router = express.Router();
const multer = require("multer");
const productController = require("../controllers/productController");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const productName = req.body.name.replace(/\s/g, "_");
    cb(
      null,
       productName + "." + file.originalname.split(".").pop()
    );
  },
});
const upload = multer({ storage: storage });

router.post(
  "/add-product",
  upload.array("images"),
  productController.createProduct
);

router.get('/product-data', productController.getProduct);
router.get('/productId/:id', productController.getProductById);
router.patch('/editProduct/:id', productController.updateProductById);
router.delete('/deleteProduct/:id', productController.deleteProductById);
router.get('/search', productController.searchProducts);
router.get('/filter', productController.filterProducts);

module.exports = router;
