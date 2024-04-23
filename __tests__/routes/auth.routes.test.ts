import createApp from '../../src/loaders/express';
import { Express } from 'express';
import request from 'supertest';
import { users } from '../data/users';
import { prismaMock } from '../setup/singleton';

describe('Auth Routes Tests', () => {
  let app: Express;

  beforeAll(async () => {
    app = createApp();
  });

  const BASE_URL = '/api/auth';

  describe(`POST ${BASE_URL}`, () => {
    describe(`POST ${BASE_URL}/login`, () => {
      test('Given valid credentials, should return 200', async () => {
        // Given
        prismaMock.user.findFirst.mockResolvedValue(users.USER);

        // when
        const response = await request(app)
          .post(BASE_URL + '/login')
          .send({
            email: 'a@b.com',
            password: 'hey',
          });

        // Then
        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
      });

      test('Given invalid credentials, should return 200', async () => {
        // Given
        prismaMock.user.findFirst.mockResolvedValue(users.USER);

        // when
        const response = await request(app)
          .post(BASE_URL + '/login')
          .send({
            email: 'a@b.com',
            password: 'hey1',
          });

        // Then
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe('Incorrect password');
      });

      test('Given user doesnt exist, should return 404', async () => {
        // Given
        prismaMock.user.findFirst.mockResolvedValue(null);

        // when
        const response = await request(app)
          .post(BASE_URL + '/login')
          .send({
            email: 'b@b.com',
            password: 'hey',
          });

        // Then
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toContain('not found');
      });
    });
  });
});
