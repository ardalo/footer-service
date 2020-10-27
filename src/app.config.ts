import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  port: process.env.APP_PORT || 8082,
  documentationUrl: process.env.documentationUrl || 'https://github.com/ardalo/footer-service/blob/main/README.md'
}));
