import Express from 'express';
import routes from '../routes';
import { errorHandler } from '../exceptions/handler';
import authenticateUser from '../middlewares/auth.middleware';
import { ApiException, ExceptionType } from '../exceptions/ApiException';

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

  app.use('/api/grocery', routes.groceryRoutes);
  app.use('/api/order', routes.orderRoutes);

  // Route not found
  app.use((req, _, next) => {
    try {
      throw new ApiException(
        `Route ${req.url} not found`,
        ExceptionType.NOT_FOUND
      );
    } catch (error) {
      next(error);
    }
  });

  // Error handling
  app.use(errorHandler);

  return app;
}
