const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/config/database.js');
const authRoutes = require('./src/routes/auth.js');
const billingRoutes = require('./src/routes/billingRoutes.js');
const dashboardRoutes = require('./src/routes/dashboardRoutes.js');
const raceRoutes = require('./src/routes/race');
const marketplaceRoutes = require('./src/routes/marketplace');
const walletRoutes = require('./src/routes/wallet');
const exchangeRoutes = require('./src/routes/exchange');
const paymentRoutes = require('./src/routes/payment');
const transactionsRoutes = require('./src/routes/transactions');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/race', raceRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/exchange', exchangeRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/transactions', transactionsRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Racing Game funcionando correctamente' });
});

app.get('/health', (req, res) => res.send('ok'));

// Iniciar servidor
async function startServer() {
  try {
    // Probar conexión a la base de datos
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();