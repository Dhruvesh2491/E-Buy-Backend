const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const productController = require("../controllers/productController");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: async function (req, file, cb) {
    try {
      let productName = "product";
      if (req.body && req.body.displayName) {
        productName = req.body.displayName.replace(/\s/g, "_");
      }
      const extension = file.originalname.split(".").pop();
      
      // Check if the file name already exists in the destination directory
      const files = await fs.promises.readdir("uploads/");
      let count = 1;
      let tempName = productName + "." + extension;
      while (files.includes(tempName)) {
        tempName = productName + "_" + count + "." + extension;
        count++;
      }
      productName = tempName;

      cb(null, productName);
    } catch (error) {
      cb(error);
    }
  },
});


const upload = multer({ storage: storage });

router.post(
  "/add-product",
  upload.single("image"),
  productController.createProduct
);

router.patch(
  "/editProduct/:id",
  upload.single("image"),
  productController.editProduct
);

router.get("/product-data", productController.getProduct);
router.get("/productId/:id", productController.getProductById);

router.delete("/deleteProduct/:id", productController.deleteProductById);
router.get("/search", productController.searchProducts);
router.get("/filter", productController.filterProducts);

module.exports = router;
