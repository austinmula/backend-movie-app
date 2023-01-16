const jwt = require('jsonwebtoken');

exports.sendError = (res, error, status = 401) => {
    res.status(status).json({ success: false, msg: error, data: [], status: status });
};


exports.jwtGenerator = (user_id) => {
    const payload = {
        id: user_id,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};