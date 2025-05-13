const sequelize = require('../config/database');
const User = require('../models/User');
const Wallet = require('../models/Wallet');

async function migrate() {
  try {
    // Sincronizar modelos con la base de datos
    await sequelize.sync({ force: true });
    console.log('Base de datos sincronizada correctamente');
    
    // Cerrar la conexión
    await sequelize.close();
  } catch (error) {
    console.error('Error en la migración:', error);
    process.exit(1);
  }
}

migrate(); 