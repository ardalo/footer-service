import crypto = require('crypto');
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import AppModule from './app.module';
import ApiDocumentationConfigurer from './apidoc/api-documentation.configurer';
import ApplicationLogger from './logging/application-logger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      requestIdHeader: 'x-request-id',
      genReqId: (req) => { return crypto.randomBytes(16).toString('hex'); }
    }),
    { bufferLogs: true }
  );
  app.useLogger(app.get(ApplicationLogger));
  ApiDocumentationConfigurer.configure(app);
  await app.listen(app.get(ConfigService).get<number>('PORT'), '0.0.0.0');
}
bootstrap();
