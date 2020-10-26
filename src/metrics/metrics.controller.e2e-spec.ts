import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import MetricsModule from './metrics.module';

describe('MetricsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MetricsModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /metrics should return metrics', () => {
    return request(app.getHttpServer())
      .get('/metrics')
      .expect(res => {
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/^text\/plain; charset=utf-8; version=/);
        expect(res.text).toContain('nodejs_version_info');
      });
  });
});
