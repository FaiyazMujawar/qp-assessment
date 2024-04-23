import Express from 'express';
import routes from '../routes';
import { errorHandler } from '../exceptions/handler';
import authenticateUser from '../middlewares/auth.middleware';

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

  app.use(authenticateUser);

  // Error handling
  app.use(errorHandler);

  app.use('/api/grocery', routes.groceryRoutes);
  app.use('/api/order', routes.orderRoutes);

  return app;
}
