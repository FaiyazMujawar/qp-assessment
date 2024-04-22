import Express from 'express';
import routes from '../routes';
import { errorHandler } from '../exceptions/handler';

export default function loadExpressApp() {
  const app = Express();
  app.use(Express.json());

  // Status check
  app.get('/api', (_, res) => {
    res.json({
      status: 'UP',
    });
  });

  app.use('/api/auth', routes.authRoutes);

  // Error handling
  app.use(errorHandler);

  return app;
}
