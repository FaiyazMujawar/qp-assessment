import { PrismaClient } from '@prisma/client';

export default class Database {
  private static prisma: PrismaClient | undefined = undefined;

  static async client() {
    if (Database.prisma === undefined) {
      await Database.connect();
    }
    return Database.prisma;
  }

  static async connect() {
    Database.prisma = new PrismaClient();
    await Database.prisma.$connect();
  }
}
