const { Connection, Keypair, PublicKey } = require('@solana/web3.js');
const crypto = require('crypto');
const sequelize = require('../src/config/database');
const User = require('../src/models/User');
const Wallet = require('../src/models/Wallet');
const { getAccount, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } = require('@solana/spl-token');
const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || 'https://api.testnet.solana.com';
const connection = new Connection(SOLANA_RPC_URL, 'confirmed');

function hashDato(dato) {
  return crypto.createHash('sha256').update(dato).digest('hex');
}

// Crear wallet
const createWallet = async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'userId requerido' });

  const user = await User.findByPk(userId);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  if (user.publicKey) return res.status(400).json({ error: 'El usuario ya tiene wallet' });

  const wallet = Keypair.generate();
  const pubkey = wallet.publicKey.toBase58();
  const secret = Buffer.from(wallet.secretKey).toString('hex');

  await Wallet.create({
    userId: user.id,
    address: pubkey,
    balance: 0
  });
  await User.update({ publicKey: pubkey }, { where: { id: userId } });
  const updatedUser = await User.findByPk(userId);
  res.json({ user: updatedUser });
};

const listWallets = async (req, res) => {
  const wallets = await Wallet.findAll({
    attributes: ['address', 'balance', 'userId']
  });
  res.json(wallets);
};

// Endpoint para consultar balance de un token SPL
const getTokenBalance = async (req, res) => {
  const { address, mint } = req.params;
  try {
    const publicKey = new PublicKey(address);
    const mintAddress = new PublicKey(mint);

    // Obtener la dirección asociada del token
    const ata = await getAssociatedTokenAddress(mintAddress, publicKey);

    // Consultar la cuenta del token
    const accountInfo = await connection.getTokenAccountBalance(ata);
    res.json({ address, mint, amount: accountInfo.value.uiAmount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSolBalance = async (req, res) => {
  const { address } = req.params;
  try {
    const publicKey = new PublicKey(address);
    const balanceLamports = await connection.getBalance(publicKey);
    const balanceSol = balanceLamports / 1e9;
    res.json({ address, sol: balanceSol });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createWallet,
  listWallets,
  getTokenBalance,
  getSolBalance
};