const supertest = require('supertest');
const app = require('../../app');
const { connectToDB } = require('../../database');
const request = supertest(app);

describe('User tests', () => {
  beforeAll(async () => {
    await connectToDB();
  });
  it('should create user and validate it by email', async () => {
    const response1 = await request.post('/users').send({
      user: {
        email: 'testmail1@gmail.com',
        password: 'Password123',
        name: 'Sushant1',
      },
    });
    expect(response1.statusCode).toBe(201);
  });

  it('should login user', async () => {
    const response1 = await request.post('/users').send({
      user: {
        email: 'testmail2@gmail.com',
        password: 'Password124',
        name: 'Sushant2',
      },
    });
    expect(response1.statusCode).toBe(201);

    const response2 = await request.post('/users/login').send({
      user: {
        email: 'testmail2@gmail.com',
        password: 'Password124',
      },
    });
    expect(response2.statusCode).toBe(200);
  });
});
