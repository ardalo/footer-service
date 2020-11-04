import { Test, TestingModule } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import MetricsModule from './metrics.module';

describe('MetricsController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MetricsModule]
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
  });

  it('should provide prometheus metrics', () => {
    return app.inject({ method: 'GET', url: '/prometheus-metrics' })
      .then(({ statusCode, headers, payload }) => {
        expect(statusCode).toBe(200);
        expect(headers['content-type']).toMatch(/^text\/plain; /);
        expect(headers['content-type']).toContain('charset=utf-8');
        expect(payload).toContain('nodejs_version_info');
      });
  });
});
