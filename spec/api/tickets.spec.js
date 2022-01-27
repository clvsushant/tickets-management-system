const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app);

describe('Tickets API test', () => {
  it('should create a new ticket', async () => {
    const response = await request.post('/tickets').send(ticketPayload);
    expect(response.statusCode).toBe(200);
  });
});
