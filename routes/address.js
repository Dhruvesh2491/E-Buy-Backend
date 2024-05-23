const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");

router.post("/add-address", addressController.address);
router.get("/get-address-data", addressController.getAddressData);
router.patch("/edit-address/:id", addressController.editAddress);

module.exports = router;