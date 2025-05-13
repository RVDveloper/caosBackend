# Últimos Cambios: Apuestas y Resultados de Carrera (Backend + Unity)

## 1. Nuevos Endpoints

### a) Crear apuesta antes de la carrera
- **POST /bet/create**
- **Body:** `{ userId, rivalId, cantidad }`
- **Función:** Bloquea la cantidad apostada de ambos usuarios y deja la apuesta pendiente.
- **Respuesta:** `{ status: 'ok', message: 'Apuesta creada y saldo bloqueado.' }`

### b) Registrar resultado de carrera
- **POST /race/result**
- **Body:** `{ userId, rivalId, tiempo, gano, posicion }`
- **Función:**
  - Transfiere los tokens apostados al ganador
  - Marca la apuesta como resuelta
  - Guarda el resultado de la carrera (tiempo y posición)
- **Respuesta:** `{ status: 'ok', message: 'Resultado procesado, tokens transferidos al ganador y resultado guardado.', winnerId }`

---

## 2. Nuevas tablas de base de datos

### a) Tabla `bets`
```sql
CREATE TABLE bets (
  id SERIAL PRIMARY KEY,
  user1_id INTEGER NOT NULL,
  user2_id INTEGER NOT NULL,
  amount DECIMAL(20,8) NOT NULL,
  status VARCHAR(20) DEFAULT 'pendiente',
  winner_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```
- Guarda la información de cada apuesta entre dos usuarios.

### b) Tabla `race_results`
```sql
CREATE TABLE race_results (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  rival_id INTEGER NOT NULL,
  tiempo DECIMAL(10,3) NOT NULL,
  posicion INTEGER NOT NULL,
  bet_id INTEGER REFERENCES bets(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```
- Guarda el resultado individual de cada usuario en una carrera (tiempo, posición, rival, referencia a la apuesta).

---

## 3. Nuevos controllers

### a) `betController.js`
- Lógica para crear una apuesta, verificar saldo y bloquear tokens.
- Se usa en el endpoint `/bet/create`.

### b) `raceController.js`
- Lógica para procesar el resultado de la carrera, transferir tokens al ganador, marcar la apuesta como resuelta y guardar el resultado.
- Se usa en el endpoint `/race/result`.

---

## 4. Acoplamiento con el backend y Unity

- Los endpoints están protegidos con autenticación JWT.
- Las rutas están conectadas en `server/src/routes/race.js` y añadidas en el `index.js` principal.
- Unity puede llamar a estos endpoints usando los scripts de ejemplo del README de integración.
- El flujo es:
  1. Ambos jugadores apuestan antes de la carrera (`/bet/create`).
  2. Al terminar la carrera, cada jugador envía su resultado (`/race/result`).
  3. El backend transfiere los tokens al ganador y guarda los resultados.

---

## 5. Ejemplo de uso desde Unity

```csharp
// Crear apuesta
StartCoroutine(EnviarApuesta(userId, rivalId, cantidad, onSuccess, onError));

// Enviar resultado de carrera
StartCoroutine(EnviarResultado(userId, rivalId, tiempo, gano, posicion, onSuccess, onError));
```

---

## 6. Resumen
- Ahora puedes gestionar apuestas, resultados y economía de carreras entre usuarios.
- Todo queda registrado en la base de datos y es accesible para ranking, historial, etc.
- El backend y Unity están completamente acoplados para este flujo competitivo.

---

¿Dudas? ¿Quieres ejemplos personalizados? ¡Pídelo! 