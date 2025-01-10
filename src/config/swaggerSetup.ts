import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { Application } from 'express';
import { Config } from '.';

// Swagger Options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: Config.SWAGGER_TITLE as string,
      version: '1.0.0',
      description: Config.SWAGGER_DESCRIPTION,
    },
    servers: [
      {
        url: Config.BASE_URL,
        description: Config.SWAGGER_SERVER_DESCRIPTION,
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/app.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export const swaggerSetup = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
