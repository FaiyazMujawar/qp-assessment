import { PrismaClient } from '@prisma/client';

export default class Database {
  private static prisma: PrismaClient | undefined = undefined;

  static get client() {
    if (Database.prisma === undefined) {
      if (process.env.NODE_ENV !== 'test') {
        throw new Error('Database not connected');
      }
    }
    return Database.prisma;
  }

  static async connect() {
    Database.prisma = new PrismaClient();
    await Database.prisma.$connect();
  }
}
