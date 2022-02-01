const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
}

exports.decodeToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}

exports.authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        next();
    } else {
        const jwtToken = token.split(" ")[1];

        try {
            const cracked = exports.decodeToken(jwtToken);
            //const {userId} = cracked.id;
            req.user = cracked;
            console.log(req.user);
            next();
        } catch (err) {
            return res.status(401).send({ message: err.message });
        }
    }
}