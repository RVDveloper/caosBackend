const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Obtener el token del header
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ msg: 'No token, authorization denied' });

  // Verificar el formato Bearer
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'Token format invalid' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}; 