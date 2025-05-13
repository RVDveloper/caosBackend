const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const billingController = require('../../controllers/billingController');
const auth = require('../middleware/auth');

// Middleware de autenticación para todas las rutas
router.use(auth);

// Rutas para información de facturación
router.get('/billing-info', billingController.getBillingInfo);
router.post('/billing-info', [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('vatNumber').optional().isString()
], billingController.addBillingInfo);

// Rutas para tarjetas de pago
router.get('/payment-cards', billingController.getPaymentCards);
router.post('/payment-cards', [
    check('cardNumber').isCreditCard().withMessage('Valid card number is required'),
    check('cardHolder').notEmpty().withMessage('Card holder name is required'),
    check('expiryDate').matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/).withMessage('Valid expiry date (MM/YY) is required'),
    check('cardType').isIn(['VISA', 'MASTERCARD', 'AMEX']).withMessage('Valid card type is required')
], billingController.addPaymentCard);

// Rutas para facturas
router.get('/invoices', billingController.getInvoices);

// Rutas para transacciones
router.get('/transactions', billingController.getTransactions);

// Rutas para historial y notificaciones
router.get('/balance-history', billingController.getBalanceHistory);
router.get('/notifications', billingController.getBillingNotifications);

module.exports = router; 