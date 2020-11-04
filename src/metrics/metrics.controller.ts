import { Controller, Get, Header } from '@nestjs/common';
import PrometheusClient = require('prom-client');

@Controller()
export default class MetricsController {
  constructor() {
    PrometheusClient.register.clear();
    PrometheusClient.collectDefaultMetrics({ register: PrometheusClient.register });
  }

  @Header('Content-Type', PrometheusClient.register.contentType)
  @Get('prometheus-metrics')
  prometheusMetrics(): string {
    return PrometheusClient.register.metrics();
  }
}
