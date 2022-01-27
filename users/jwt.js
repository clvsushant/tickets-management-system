const jwt = require('jsonwebtoken');
const JWT_SECRET = 'n198x37r@*^#@#N*&@^6JHU763'; //TODO: move sensitive things in separate config file

exports.sign = async (user) => {
  return jwt.sign({ user }, JWT_SECRET);
};

const decode = async (token) => {
  return jwt.verify(token, JWT_SECRET);
};

exports.authByToken = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader)
    return res.status(401).json({
      errors: { body: ['Authorization failed', 'No Authorization header'] },
    });

  const authHead = authHeader.split(' ');
  if (authHead[0] != 'Token')
    return res.status(401).json({
      errors: { body: ['Authorization failed', 'Token missing'] },
    });

  const token = authHead[1];
  try {
    const user = await decode(token);
    if (!user) throw new Error('No user found in token');
    req.user = user.user;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: { body: ['Authorization failed', e.message] },
    });
  }
};

exports.decode = decode;
