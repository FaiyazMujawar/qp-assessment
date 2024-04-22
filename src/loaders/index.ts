import Database from './db';
import loadExpressApp from './express';

export default async function loadApplication() {
  await Database.connect();
  const app = loadExpressApp();
  return app;
}
