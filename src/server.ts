import app from './app';
import { Config } from './config';
import dbConnect from './config/dbConnect';
import logger from './config/logger';

const startServer = () => {
  const PORT = Config.PORT || 5000;

  dbConnect();

  try {
    app.listen(PORT, () => logger.info(`Listening on PORT ${PORT}`));
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err.message);
      setTimeout(() => {
        process.exit(1);
      }, 1000);
    }
  }
};

startServer();
