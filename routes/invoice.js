const express = require('express');
const router = express.Router();
const { generateInvoice } = require('../controllers/invoiceController');
const auth = require('../middleware/auth');

router.get('/generate/:orderId', auth, generateInvoice);

module.exports = router;
