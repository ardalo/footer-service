import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
  });

  it('/ (GET)', () => {
    return app.inject({ method: 'GET', url: '/' })
      .then(({ statusCode, headers, payload }) => {
        expect(statusCode).toBe(200);
        expect(payload).toEqual('Hello World!');
      });
  });
});
