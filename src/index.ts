import { PORT } from './config';
import loadApplication from './loaders';

loadApplication()
  .then((app) =>
    app.listen(PORT, () =>
      console.log(`Server started on: http://localhost:${PORT}/api`)
    )
  )
  .catch((error) => {
    console.error(`Could not start server: ${error}`);
  });
