const jwt = require('jsonwebtoken');

// Lembra de manter a mesma chave secreta que usou antes
const JWT_SECRET = 'zezinho123';

const autenticarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const dadosToken = jwt.verify(token, JWT_SECRET);
        req.usuarioLogado = dadosToken;
        next();
    } catch (error) {
        return res.status(403).json({ erro: 'Token inválido ou expirado.' });
    }
};

module.exports = autenticarToken;