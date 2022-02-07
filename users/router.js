const { Router } = require('express');
const { authByToken } = require('../utils/jwt');
const { createUser, loginUser, getUserById } = require('./module');
const route = Router();

route.post('/login', async (req, res) => {
  try {
    const token = await loginUser(req.body);
    return res.status(200).json({ token });
  } catch (e) {
    return res.status(422).json({
      errors: { body: ['Login Failed', e.message] },
    });
  }
});

route.post('/', async (req, res) => {
  try {
    const token = await createUser(req.body);
    return res.status(201).json({ token });
  } catch (e) {
    return res.status(422).json({
      errors: { body: ['Could not create user', e.message] },
    });
  }
});

route.get('/me', authByToken, async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) throw new Error('No such user found');
    return res.status(200).json(user);
  } catch (e) {
    return res.status(404).json({
      errors: { body: [e.message] },
    });
  }
});

module.exports = route;
