import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import MetricsModule from './metrics/metrics.module';
import HealthModule from './health/health.module';

@Module({
  imports: [
    HealthModule,
    MetricsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
