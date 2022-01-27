const { Router } = require('express');
const { createTicket } = require('./module');
const route = Router();

route.post('/', async (req, res) => {
  try {
    const ticket = await createTicket(req.body.ticket);
    return res.status(200).json({ ticket });
  } catch (err) {
    return res.status(422).json({
      errors: { body: ['Could not create user', err.message] },
    });
  }
});

module.exports = route;
