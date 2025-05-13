const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Wallet = sequelize.define('Wallet', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  balance: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false,
    defaultValue: 0,
  },
}, {
  timestamps: true,
});

// Relación con User
Wallet.belongsTo(User);
User.hasOne(Wallet);

module.exports = Wallet; 