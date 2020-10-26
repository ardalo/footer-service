import { Test, TestingModule } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import HealthModule from './health.module';

describe('HealthController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HealthModule]
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
  });

  it('GET /alive should return 200 OK', () => {
    return app.inject({ method: 'GET', url: '/alive' })
      .then(({ statusCode, payload }) => {
        expect(statusCode).toBe(200);
        expect(payload).toBe('');
      });
  });

  it('GET /ready should return 200 OK', () => {
    return app.inject({ method: 'GET', url: '/ready' })
      .then(({ statusCode, payload }) => {
        expect(statusCode).toBe(200);
        expect(payload).toBe('');
      });
  });
});
