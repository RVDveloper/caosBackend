const express = require('express');
const router = express.Router();
const exchangeController = require('../../controllers/exchangeController');
const auth = require('../middleware/auth');

// Transferencia de tokens
router.post('/api/token', auth, exchangeController.exchangeToken);

// Transferencia de NFT
router.post('/api/nft', auth, exchangeController.exchangeNFT);

// (Puedes agregar aquí endpoints para historial, si los tienes en el controlador)

module.exports = router;