import { Sequelize } from 'sequelize';
import { Config } from '.';
import logger from './logger';

export const pgSequelize = new Sequelize(Config.DB_URL as string, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const dbConnect = async () => {
  try {
    await pgSequelize.authenticate();
    logger.info('Connection Established Successfully');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export default dbConnect;
