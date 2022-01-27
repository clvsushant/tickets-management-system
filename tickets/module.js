const { Ticket } = require('../database');
const { createTickectSchema } = require('./validation');

exports.createTicket = async (ticketPayload) => {
  await createTickectSchema.validateAsync(ticketPayload);
  return await Ticket.create({
    category: ticketPayload.category,
    subcategory: ticketPayload.subcategory,
    title: ticketPayload.title,
    description: ticketPayload.description,
    assignedTo: ticketPayload.assignedTo,
  });
};
