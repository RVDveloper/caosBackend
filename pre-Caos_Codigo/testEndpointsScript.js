const axios = require('axios');

const endpoints = [
  { method: 'get', url: 'https://racing-f1-backend.fly.dev/api/marketplace/listings' },
  { method: 'post', url: 'https://racing-f1-backend.fly.dev/api/auth/register', data: { username: 'usuarioejemplo', email: 'usuario@ejemplo.com', password: '123456' } },
  { method: 'post', url: 'https://racing-f1-backend.fly.dev/api/auth/login', data: { email: 'usuario@ejemplo.com', password: '123456' } },
  { method: 'post', url: 'https://racing-f1-backend.fly.dev/api/bet/create', data: { userId: 1, rivalId: 2, cantidad: 10 } },
  // ...añade aquí todos los endpoints que quieras probar
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
