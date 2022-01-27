const { Router } = require('express');
const { authByToken } = require('./jwt');
const { createUser, loginUser, getUserByEmail } = require('./module');
const route = Router();

route.post('/login', async (req, res) => {
  try {
    const token = await loginUser(req.body.user);
    return res.status(200).json({ token });
  } catch (e) {
    return res.status(422).json({
      errors: { body: ['Login Failed', e.message] },
    });
  }
});

route.post('/', async (req, res) => {
  try {
    const token = await createUser(req.body.user);
    return res.status(201).json({ token });
  } catch (e) {
    return res.status(422).json({
      errors: { body: ['Could not create user', e.message] },
    });
  }
});

route.get('/', authByToken, async (req, res) => {
  try {
    const user = await getUserByEmail(req.user.email);
    if (!user) throw new Error('No such user found');
    return res.status(200).json({ user });
  } catch (e) {
    return res.status(404).json({
      errors: { body: [e.message] },
    });
  }
});

module.exports = route;
