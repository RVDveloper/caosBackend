-- Tabla para transacciones
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    from_addr TEXT NOT NULL,
    to_addr TEXT NOT NULL,
    amount DECIMAL NOT NULL,
    signature TEXT NOT NULL,
    from_username TEXT NOT NULL,
    to_username TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_addr) REFERENCES users(publickey),
    FOREIGN KEY (to_addr) REFERENCES users(publickey)
);

-- Tabla para wallets
CREATE TABLE IF NOT EXISTS wallets (
    id SERIAL PRIMARY KEY,
    username_hash TEXT NOT NULL,
    email_hash TEXT NOT NULL,
    public_key TEXT NOT NULL UNIQUE,
    private_key TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar el rendimiento de las consultas
CREATE INDEX IF NOT EXISTS idx_transactions_from_addr ON transactions(from_addr);
CREATE INDEX IF NOT EXISTS idx_transactions_to_addr ON transactions(to_addr);
CREATE INDEX IF NOT EXISTS idx_wallets_public_key ON wallets(public_key); 