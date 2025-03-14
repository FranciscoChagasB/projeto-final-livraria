const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Acesso não autorizado' });
    }

    try {
        const decoded = jwt.verify(token, 'SECRET_KEY');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
}

module.exports = {
    authenticateToken,
};
