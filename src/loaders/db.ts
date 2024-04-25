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
    let tries = 5;
    while (tries--) {
      try {
        Database.prisma = new PrismaClient();
        await Database.prisma.$connect();
        break;
      } catch (error) {
        if (tries == 0) {
          throw error;
        }
        // sleep for 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }
}
