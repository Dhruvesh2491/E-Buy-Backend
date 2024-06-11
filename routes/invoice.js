const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const generateInvoice  = require('../controllers/invoiceController/generateInvoice');

router.get('/generate/:orderId', auth, generateInvoice.generateInvoice);

module.exports = router;
