const sequelize = require('../src/config/database');

const createBet = async (req, res) => {
  const { userId, rivalId, cantidad } = req.body;
  if (!userId || !rivalId || !cantidad) {
    return res.status(400).json({ error: 'Faltan parámetros' });
  }
  try {
    // Verificar wallets y saldo
    const [userWalletRows] = await sequelize.query('SELECT * FROM "Wallets" WHERE userId = ?', { replacements: [userId] });
    const [rivalWalletRows] = await sequelize.query('SELECT * FROM "Wallets" WHERE userId = ?', { replacements: [rivalId] });
    const userWallet = userWalletRows[0];
    const rivalWallet = rivalWalletRows[0];
    if (!userWallet || !rivalWallet) return res.status(400).json({ error: 'Ambos usuarios deben tener wallet.' });
    if (parseFloat(userWallet.balance) < cantidad || parseFloat(rivalWallet.balance) < cantidad) {
      return res.status(400).json({ error: 'Saldo insuficiente para apostar.' });
    }

    // Descontar saldo (bloqueo simulado)
    await sequelize.query('UPDATE "Wallets" SET balance = balance - ? WHERE userId = ?', { replacements: [cantidad, userId] });
    await sequelize.query('UPDATE "Wallets" SET balance = balance - ? WHERE userId = ?', { replacements: [cantidad, rivalId] });

    // Registrar la apuesta pendiente
    await sequelize.query(`
      INSERT INTO bets (user1_id, user2_id, amount, status)
      VALUES (?, ?, ?, 'pendiente')
    `, { replacements: [userId, rivalId, cantidad] });

    res.json({ status: 'ok', message: 'Apuesta creada y saldo bloqueado.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la apuesta', details: error.message });
  }
};

module.exports = { createBet };
