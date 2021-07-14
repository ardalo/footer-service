import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule, Params } from 'nestjs-pino';
import { APP_FILTER } from '@nestjs/core';
import MetricsModule from './metrics/metrics.module';
import HealthModule from './health/health.module';
import { appConfigValidationSchema } from './app.config';
import { GlobalExceptionFilter } from './error/global-exception.filter';

@Module({
  imports: [
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
    LoggerModule.forRootAsync({
      imports: [ConfigService],
      inject: [ConfigService],
      useFactory: (config: ConfigService): Params => ({
        // @see https://github.com/pinojs/pino/blob/HEAD/docs/api.md#options
        pinoHttp: {
          level: config.get('LOGGER_LEVEL'),
          formatters: {
            level: (level: string, number: number) => ({ level: level })
          },
          // @see default serializers: https://github.com/pinojs/pino-std-serializers/tree/master/lib
          serializers: {
            req: (req) => ({
              id: req.id,
              method: req.method,
              url: req.url,
              remoteAddress: req.remoteAddress
            }),
            res: (res) => ({
              status: res.statusCode
            })
          },
          // Set "base" to undefined to avoid adding "pid" and "hostname" properties to each log
          base: undefined
        }
      })
    }),
    MetricsModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    }
  ]
})
export class AppModule {}
