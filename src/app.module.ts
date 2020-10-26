import { Module } from '@nestjs/common';
import MetricsModule from './metrics/metrics.module';
import HealthModule from './health/health.module';

@Module({
  imports: [
    HealthModule,
    MetricsModule
  ]
})
export class AppModule {}
