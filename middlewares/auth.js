const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).json({ auth: false, message: 'Token não fornecido.' });

  // Remove o prefixo 'Bearer ' do token
  const tokenWithoutBearer = token.replace('Bearer ', '');

  jwt.verify(tokenWithoutBearer, 'MySecretKey', (err, decoded) => {
    if (err) return res.status(401).json({ auth: false, message: 'Falha ao autenticar o token.' });

    req.authId = decoded.id;
    next();
  });
}

module.exports = verifyToken;