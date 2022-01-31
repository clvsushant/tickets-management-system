const { Router } = require('express');
const { authByToken } = require('../users/jwt');
const { getUserByEmail } = require('../users/module');
const { createTicket } = require('./module');
const route = Router();

route.post('/', authByToken, async (req, res) => {
  try {
    const existing = await getUserByEmail(req.user.email);
    if (!existing) throw new Error('No such user found by token');
    const ticket = await createTicket(req.body.ticket, existing.id);
    return res.status(200).json({ ticket });
  } catch (err) {
    return res.status(422).json({
      errors: { body: ['Could not create Ticket', err.message] },
    });
  }
});

module.exports = route;
