const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const addAddressController = require("../controllers/addressControllers/addAddress");
const getAddressDataController = require("../controllers/addressControllers/getAddressData");
const editAddressController = require("../controllers/addressControllers/editAddress");

router.post("/add-address", auth, addAddressController.addAddress);
router.get("/get-address-data", auth, getAddressDataController.getAddressData);
router.patch("/edit-address/:id", auth, editAddressController.editAddress);

module.exports = router;
