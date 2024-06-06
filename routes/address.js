const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");
const auth = require("../middleware/auth");

router.post("/add-address", auth, addressController.address);
router.get("/get-address-data", auth, addressController.getAddressData);
router.patch("/edit-address/:id", auth, addressController.editAddress);

module.exports = router;
