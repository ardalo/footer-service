import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import SwaggerUiConfigurer from './swaggerui/swagger-ui.configurer';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  SwaggerUiConfigurer.configure(app);
  await app.listen(app.get(ConfigService).get('APP_PORT'), '0.0.0.0');
}
bootstrap();
