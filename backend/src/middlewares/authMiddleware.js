const jwt = require('jsonwebtoken');
require('dotenv').config(); // Carregar variáveis de ambiente

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is sent as Bearer token

    if (!token) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }

        // Add userId to the request object
        req.userId = decoded.userId; // Assuming the decoded token has a 'userId'
        next();
    });
};

module.exports = { authenticateToken };