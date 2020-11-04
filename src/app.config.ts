import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const appConfig = registerAs('app', () => ({
  name: process.env.APP_NAME,
  port: parseInt(process.env.APP_PORT, 10),
  documentationUrl: process.env.APP_DOCUMENTATION_URL
}));
export const appConfigValidationSchema = {
  APP_NAME: Joi.string()
    .description('Name of the application'),
  APP_PORT: Joi.number()
    .port()
    .description('The port to expose the application at'),
  APP_DOCUMENTATION_URL: Joi.string()
    .description('URL where to find the application documentation')
};
