const jwt = require('jsonwebtoken');
const JWT_SECRET =
  'ed87cdb87de0b0ab7f45ccd779df15e536b3477b8f683c6a70bf04ba223f0f106a8f76509d1221298b07ef3d0d7f4951a5ff9d30765966f80ec93a3a486960da'; //TODO: move sensitive things in separate config file

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
