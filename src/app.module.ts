import { Module } from '@nestjs/common';
import MetricsModule from './metrics/metrics.module';
import HealthModule from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig
      ]
    }),
    HealthModule,
    MetricsModule
  ]
})
export class AppModule {}
