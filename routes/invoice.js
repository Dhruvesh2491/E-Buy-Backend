const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getInvoiceDetails } = require('../controllers/invoiceController');

router.get('/invoicedata/:orderId', auth, getInvoiceDetails);

module.exports = router;
