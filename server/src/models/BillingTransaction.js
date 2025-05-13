const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const BillingTransaction = sequelize.define('BillingTransaction', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
  amount: { type: DataTypes.DECIMAL(20, 2), allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  currency: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'billing_transactions',
  timestamps: false
});

BillingTransaction.belongsTo(User, { foreignKey: 'user_id' });

module.exports = BillingTransaction; 