const supertest = require('supertest');
const app = require('../../app');
const { startServer, stopServer } = require('../utils/database');
const request = supertest(app);

describe('User tests', () => {
  beforeAll(async () => {
    await startServer();
    console.log(process.env.JWT_SECRET);
    console.log(process.env.DB_NAME);
  });
  afterAll(async () => {
    await stopServer();
  });
  it('should create user and validate it by email', async () => {
    const response1 = await request.post('/users').send({
      email: 'testmail1@gmail.com',
      password: 'Password123',
      name: 'Sushant1',
    });
    expect(response1.statusCode).toBe(201);
    expect(response1.body.token).toBeDefined();
  });

  it('should login user', async () => {
    const response1 = await request.post('/users').send({
      email: 'testmail2@gmail.com',
      password: 'Password124',
      name: 'Sushant2',
    });
    expect(response1.statusCode).toBe(201);
    expect(response1.body.token).toBeDefined();
    const token1 = response1.body.token;

    const response2 = await request.post('/users/login').send({
      email: 'testmail2@gmail.com',
      password: 'Password124',
    });
    expect(response2.statusCode).toBe(200);
    expect(response2.body.token).toBeDefined();
    const token2 = response2.body.token;

    const response3 = await request
      .get('/users/me')
      .set('Authorization', 'Bearer ' + token1);
    expect(response3.statusCode).toBe(200);
    expect(response3.body.email).toBe('testmail2@gmail.com');
    expect(response3.body.name).toBe('Sushant2');

    const response4 = await request
      .get('/users/me')
      .set('Authorization', 'Bearer ' + token2);
    expect(response4.statusCode).toBe(200);
    expect(response4.body.email).toBe('testmail2@gmail.com');
    expect(response4.body.name).toBe('Sushant2');
  });
});
