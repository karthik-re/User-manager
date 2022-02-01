const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
}

exports.decodeToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}

exports.authMiddleware = (req, res, next) => {
    const token = req.header['authorization'];
    if (!token) {
        return next();
    } else {
        const jwtToken = token.split(" ")[1];

        try {
            const cracked = exports.decodeToken(jwtToken);
            const { userId } = cracked;
            req.user = { userId };
            return next();
        } catch (err) {
            return res.status(401).json({
                errors: { body: ['Authorization failed', e.message] },
            });
        }
    }
}