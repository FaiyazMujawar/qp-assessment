import createApp from '../../src/loaders/express';
import { Express } from 'express';
import { prismaMock } from '../setup/singleton';
import request from 'supertest';
import { tokens } from '../data/tokens';
import { groceries } from '../data/groceries';
import { users } from '../data/users';

describe('Grocery Routes Tests', () => {
  let app: Express;

  beforeAll(async () => {
    app = createApp();
  });

  const BASE_URL = '/api/grocery';

  describe(`POST   ${BASE_URL}`, () => {
    describe(`POST ${BASE_URL}/`, () => {
      test('Given valid data, should return 201', async () => {
        // Given
        prismaMock.grocery.create.mockResolvedValue(groceries[0]);
        prismaMock.user.findFirst.mockResolvedValue(users.ADMIN);

        // when
        const response = await request(app)
          .post(BASE_URL)
          .set('Authorization', `Bearer ${tokens.ADMIN}`)
          .send({
            name: 'g1',
            price: 100,
            quantity: 50,
          });

        // Then
        expect(response.statusCode).toBe(201);
        expect(response.body.id).toBe(groceries[0].id);
      });

      test('Given user is not ADMIN, should return 403', async () => {
        // Given
        prismaMock.user.findFirst.mockResolvedValue(users.USER);

        // when
        const response = await request(app)
          .post(BASE_URL)
          .set('Authorization', `Bearer ${tokens.USER}`)
          .send({
            name: 'g1',
            price: 100,
            quantity: 50,
          });

        // Then
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Action not allowed');
      });
    });
  });
});
