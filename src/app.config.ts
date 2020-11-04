import * as Joi from 'joi';

export const appConfigValidationSchema = {
  APP_NAME: Joi.string()
    .required()
    .description('Name of the application'),
  APP_PORT: Joi.number()
    .port()
    .required()
    .description('The port to expose the application at'),
  APP_DOCUMENTATION_URL: Joi.string()
    .required()
    .description('URL where to find the application documentation')
};
