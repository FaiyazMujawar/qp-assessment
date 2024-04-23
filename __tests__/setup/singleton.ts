import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import Database from '../../src/loaders/db';

jest.mock('../../src/loaders/db', () => ({
  __esModule: true,
  default: {
    client: mockDeep<PrismaClient>(),
    connect: async () => {},
  },
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = (Database.client as unknown) as DeepMockProxy<
  PrismaClient
>;
