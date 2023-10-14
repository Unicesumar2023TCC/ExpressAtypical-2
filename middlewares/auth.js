const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  let token = req.headers['authorization'];

  if (!token) {
    // Se não houver token no header, verifica se está no cookie
    token = req.cookies.jwt;
  }

  if (!token) return res.status(403).json({ auth: false, message: 'Token não fornecido.' });

  // Remove o prefixo 'Bearer ' do token, se presente
  token = token.replace('Bearer ', '');

  jwt.verify(token, 'MySecretKey', (err, decoded) => {
    if (err) return res.status(401).json({ auth: false, message: 'Falha ao autenticar o token.' });

    req.authId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
