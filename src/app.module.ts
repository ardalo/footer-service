import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
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
        }
      ),
      validationOptions: {
        allowUnknown: true,
        abortEarly: false
      }
    }),
    HealthModule,
    LoggerModule.forRootAsync({
      providers: [ConfigService],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        pinoHttp: {
          level: config.get('LOGGER_LEVEL'),
          formatters: {
            level: (level: string, number: number) => ({ level: level })
          }
        },
        renameContext: 'className'
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
