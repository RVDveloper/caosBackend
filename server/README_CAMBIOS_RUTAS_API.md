# Cambios en las rutas de la API y guía de uso (Backend + Frontend/Unity)

## 1. Cambios realizados en las rutas del backend

### ¿Qué se hizo?
- **Todas las rutas de la API ahora están bajo el prefijo `/api`** para mayor organización y profesionalidad.
- Se importaron y montaron explícitamente todas las rutas en el archivo `index.js`:

```js
app.use('/api/auth', authRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/race', raceRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/exchange', exchangeRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/transactions', transactionsRoutes);
```

---

## 2. ¿Cómo deben ser los llamados a los endpoints desde el frontend/Unity?

### Ejemplos de endpoints actualizados:

- **Registro:**  
  `POST https://racing-f1-backend.fly.dev/api/auth/register`

- **Login:**  
  `POST https://racing-f1-backend.fly.dev/api/auth/login`

- **Listar autos en venta:**  
  `GET https://racing-f1-backend.fly.dev/api/marketplace/listings`

- **Comprar un auto:**  
  `POST https://racing-f1-backend.fly.dev/api/marketplace/buy`

- **Crear apuesta:**  
  `POST https://racing-f1-backend.fly.dev/api/race/bet/create`

- **Enviar resultado de carrera:**  
  `POST https://racing-f1-backend.fly.dev/api/race/race/result`

- **Consultar historial de transacciones:**  
  `GET https://racing-f1-backend.fly.dev/api/transactions/history/:userId`

- **Consultar balance de wallet:**  
  `GET https://racing-f1-backend.fly.dev/api/wallet/:address/sol`

- **Transferir tokens SPL:**  
  `POST https://racing-f1-backend.fly.dev/api/exchange/token`

---

## 3. ¿Cómo probar los endpoints?

### A. Usando Postman, Insomnia o navegador

1. **Primero registra un usuario:**
   - `POST https://racing-f1-backend.fly.dev/api/auth/register`
   - Body:
     ```json
     {
       "username": "usuarioejemplo",
       "email": "usuario@ejemplo.com",
       "password": "123456"
     }
     ```
2. **Luego haz login con ese usuario:**
   - `POST https://racing-f1-backend.fly.dev/api/auth/login`
   - Body:
     ```json
     {
       "email": "usuario@ejemplo.com",
       "password": "123456"
     }
     ```
   - Guarda el token JWT de la respuesta.
3. **Para endpoints protegidos, añade la cabecera:**
   ```
   Authorization: Bearer TU_TOKEN_JWT
   ```

### B. Usando el script de test automático

Guarda este script como `testEndpointsScript.js` y ejecútalo con Node.js:

```js
const axios = require('axios');

const endpoints = [
  { method: 'post', url: 'https://racing-f1-backend.fly.dev/api/auth/register', data: { username: 'usuarioejemplo', email: 'usuario@ejemplo.com', password: '123456' } },
  { method: 'post', url: 'https://racing-f1-backend.fly.dev/api/auth/login', data: { email: 'usuario@ejemplo.com', password: '123456' } },
  { method: 'get', url: 'https://racing-f1-backend.fly.dev/api/marketplace/listings' },
  // Añade aquí más endpoints según tu flujo, usando el prefijo /api
];

async function testEndpoints() {
  for (const ep of endpoints) {
    try {
      const res = await axios({ method: ep.method, url: ep.url, data: ep.data });
      console.log(`${ep.url}: OK (${res.status})`);
    } catch (err) {
      console.log(`${ep.url}: ERROR (${err.response ? err.response.status : err.message})`);
    }
  }
}

testEndpoints();
```

- **Recuerda:**
  - Para endpoints protegidos, primero haz login, guarda el token y añádelo en la cabecera `Authorization` en las siguientes peticiones.

---

## 4. Notas importantes

- **TODOS los endpoints deben llamarse usando `/api/` como prefijo.**
- Si tienes scripts, frontend o Unity, **actualiza las URLs** para que usen el nuevo prefijo.
- Si un endpoint da error 404, revisa que estés usando `/api/` en la URL.
- Si da 401, revisa que estés enviando el token JWT.

---

## 5. ¿Qué hacer si un endpoint falla?

- Verifica la URL y el método (GET, POST, etc.).
- Asegúrate de enviar los datos correctos en el body.
- Si es un endpoint protegido, asegúrate de enviar el token JWT.
- Consulta los logs del servidor para más detalles.

---

## 6. Ejemplo de flujo desde Unity o frontend

1. **Registro:**
   Llama a `/api/auth/register` para crear el usuario.
2. **Login:**
   Llama a `/api/auth/login` y guarda el token JWT.
3. **Apuesta:**
   Llama a `/api/race/bet/create` enviando el token en la cabecera.
4. **Resultado:**
   Llama a `/api/race/race/result` con el token.
5. **Marketplace:**
   Llama a `/api/marketplace/listings` para ver autos en venta.

---

¿Dudas? ¿Quieres ejemplos de código para consumir estos endpoints desde Unity o JavaScript? ¿O necesitas ayuda para interpretar los resultados del script de test? ¡Dímelo y te lo preparo! 