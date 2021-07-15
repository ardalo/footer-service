import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { APP_FILTER } from '@nestjs/core';
import MetricsModule from './metrics/metrics.module';
import HealthModule from './health/health.module';
import { appConfigValidationSchema } from './app.config';
import { GlobalExceptionFilter } from './error/global-exception.filter';
import ApplicationLoggerModule from './logging/application-logger.module';
import AccessLoggerMiddleware from './logging/access-logger.middleware';
import RequestContextMiddleware from './request-context/request-context.middleware';

@Module({
  imports: [
    ApplicationLoggerModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.dist'],
      isGlobal: true,
      validationSchema: Joi.object({
        ...appConfigValidationSchema
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: false
      }
    }),
    HealthModule,
    MetricsModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    }
  ]
})
export default class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(RequestContextMiddleware).forRoutes('(.*)')
      .apply(AccessLoggerMiddleware).forRoutes('(.*)');
  }
}
