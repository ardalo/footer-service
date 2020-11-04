import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import MetricsModule from './metrics/metrics.module';
import HealthModule from './health/health.module';
import { appConfigValidationSchema } from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.default'],
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
    MetricsModule
  ]
})
export class AppModule {}
