# Racing F1 Backend

Backend server for Racing F1 game with Solana integration.

## Características principales

- Autenticación y autorización de usuarios
- Gestión de wallets de Solana
- Sistema de pagos y transacciones
- Intercambio de tokens y NFTs simulados
- Integración con Solana Testnet
- Gestión de metadatos de tokens
- Configuración y administración de tokens

## Estructura del Proyecto

- **Controladores:**
  - `walletController.js`: Gestión de wallets (crear, listar, consultar balances).
  - `exchangeController.js`: Transferencias de tokens SPL y NFTs simulados entre usuarios.
  - `marketplaceController.js`: Lógica de tienda para listar, comprar y vender autos (NFTs simulados).
  - `paymentController.js`: Pagos en SOL entre usuarios.
  - `transactionsController.js`: Historial de transacciones.
  - `billingController.js`, `dashboardController.js`: Facturación y estadísticas.

- **Rutas REST:**
  - `/wallet`: Endpoints para crear y consultar wallets y balances.
  - `/exchange`: Endpoints para transferir tokens y NFTs simulados.
  - `/marketplace`: Endpoints para listar, comprar y vender autos (NFTs simulados).
  - `/transactions`: Historial de transacciones.
  - `/payment`, `/billing`, `/dashboard`: Otros servicios.

- **.env:**
  - Configuración de base de datos, Solana testnet, claves, y servicios externos como NFT.Storage y CoinGecko.

## Endpoints principales

### Wallets
- `POST /wallet/create` — Crea una wallet de Solana para un usuario.
- `GET /wallet/list` — Lista todas las wallets.
- `GET /wallet/:address/sol` — Consulta el balance de SOL.
- `GET /wallet/:address/token/:mint` — Consulta el balance de un token SPL.

### Marketplace (NFTs simulados)
- `GET /marketplace/listings` — Lista todos los autos (NFTs) en venta.
- `POST /marketplace/buy` — Comprar un auto (NFT) de la tienda.
- `POST /marketplace/sell` — Vender un auto (NFT), listarlo en la tienda.

### Exchange y transferencias
- `POST /exchange/token` — Transfiere tokens SPL entre usuarios.
- `POST /exchange/nft` — Transfiere un NFT simulado entre usuarios.

### Transacciones
- `GET /transactions/history/:userId` — Historial de transacciones de un usuario.

### Otros servicios
- `/payment`: Pagos en SOL entre usuarios.
- `/billing`: Facturación, tarjetas, facturas, historial de balance y notificaciones.
- `/dashboard`: Estadísticas y leaderboard.

## ¿Cómo funciona la simulación de NFTs?

- Cada "NFT" es un auto (car) con imagen, nombre y propietario, guardado en la base de datos.
- Las compras, ventas y transferencias de NFTs se hacen transfiriendo tokens SPL entre usuarios y cambiando el propietario en la base de datos.
- Todo ocurre en testnet de Solana, usando wallets y tokens SPL reales, pero los NFTs no existen en la blockchain, solo en la base de datos.

## Estado de la implementación

- ✅ Endpoints y controladores creados y acoplados correctamente.
- ✅ Configuración de base de datos, Solana testnet, tokens SPL, NFT.Storage, CoinGecko y autenticación JWT en `.env`.
- ✅ Middleware de autenticación protegiendo rutas sensibles.
- ❌ Falta implementar la lógica real de compra/venta de autos (NFTs simulados) en `marketplaceController.js`:
  - Transferencia de tokens SPL y actualización del propietario en la base de datos.
  - Validación de saldo antes de comprar.
  - Mejorar el manejo de errores (saldo insuficiente, auto no disponible, etc).

## Ejemplo de flujo

1. El usuario crea una wallet (`/wallet/create`).
2. Consulta su balance de SOL y tokens SPL (`/wallet/:address/sol`, `/wallet/:address/token/:mint`).
3. Ve la tienda de autos (NFTs) (`/marketplace/listings`).
4. Compra un auto (`/marketplace/buy`): el backend transfiere tokens SPL y actualiza el propietario.
5. Puede transferir el auto a otro usuario (`/exchange/nft`).

## Seguridad

- Contraseñas hasheadas con bcrypt
- Claves privadas cifradas
- Autenticación JWT para endpoints
- HTTPS en producción
- Variables de entorno para datos sensibles

## Licencia

Este proyecto está licenciado bajo MIT License - ver el archivo LICENSE para más detalles.

---

**Puedes extender este README con ejemplos de peticiones/respuestas JSON y detalles de implementación según lo necesites.** 