import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import path from 'path';

const client = new PrismaClient();

client
  .$connect()
  .then(async () => {
    const query = readFileSync(path.join('prisma', 'data.sql')).toString();
    await client.$executeRawUnsafe(query);
  })
  .finally(async () => {
    await client.$disconnect();
  });
