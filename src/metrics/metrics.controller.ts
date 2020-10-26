import { Controller, Get, Header } from '@nestjs/common';
import PrometheusClient = require('prom-client');

@Controller()
export default class MetricsController {
  constructor() {
    PrometheusClient.collectDefaultMetrics();
  }

  @Header('Content-Type', PrometheusClient.register.contentType)
  @Get('metrics')
  prometheusMetrics(): string {
    return PrometheusClient.register.metrics();
  }
}
