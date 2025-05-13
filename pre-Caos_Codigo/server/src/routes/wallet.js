const express = require('express');
const router = express.Router();
const walletController = require('../../controllers/walletController');
const auth = require('../middleware/auth');

// Crear wallet
router.post('/api/wallet/create', walletController.createWallet);

// Listar wallets
router.get('/wallet/list', walletController.listWallets);

// Consultar balance de un token SPL en una wallet
router.get('/api/wallet/:address/token/:mint', walletController.getTokenBalance);

// Consultar balance de SOL en una wallet
router.get('/api/wallet/:address/sol', walletController.getSolBalance);

// (Puedes agregar aquí endpoints para consultar balance, listar wallets, etc.)

module.exports = router;