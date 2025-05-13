const BillingInfo = require('../src/models/BillingInfo');
const PaymentCard = require('../src/models/PaymentCard');
const Invoice = require('../src/models/Invoice');
const BillingTransaction = require('../src/models/BillingTransaction');
const BalanceHistory = require('../src/models/BalanceHistory');
const BillingNotification = require('../src/models/BillingNotification');

// Info de facturación
const getBillingInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const info = await BillingInfo.findAll({ where: { user_id: userId } });
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addBillingInfo = async (req, res) => {
  try {
    const { name, company, email, vatNumber } = req.body;
    const userId = req.user.id;
    const info = await BillingInfo.create({ user_id: userId, name, company, email, vat_number: vatNumber });
    res.status(201).json(info);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Tarjetas de pago
const getPaymentCards = async (req, res) => {
  try {
    const userId = req.user.id;
    const cards = await PaymentCard.findAll({
      where: { user_id: userId },
      attributes: ['id', 'card_number', 'card_holder', 'expiry_date', 'card_type', 'is_default']
    });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addPaymentCard = async (req, res) => {
  try {
    const { cardNumber, cardHolder, expiryDate, cardType } = req.body;
    const userId = req.user.id;
    const card = await PaymentCard.create({
      user_id: userId,
      card_number: cardNumber,
      card_holder: cardHolder,
      expiry_date: expiryDate,
      card_type: cardType
    });
    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Facturas
const getInvoices = async (req, res) => {
  try {
    const userId = req.user.id;
    const invoices = await Invoice.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']]
    });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Transacciones de facturación
const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const txs = await BillingTransaction.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']]
    });
    res.json(txs);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Historial de balance
const getBalanceHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await BalanceHistory.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']]
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Notificaciones de facturación
const getBillingNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await BillingNotification.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']]
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getBillingInfo,
  addBillingInfo,
  getPaymentCards,
  addPaymentCard,
  getInvoices,
  getTransactions,
  getBalanceHistory,
  getBillingNotifications
};