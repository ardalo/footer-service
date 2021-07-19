import { Test, TestingModule } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import AppModule from '../app.module';

describe('AccessLoggerMiddleware (e2e)', () => {
  let app: NestFastifyApplication;
  let processStdoutSpy;

  beforeAll(async () => {
    processStdoutSpy = jest.spyOn(process.stdout, 'write').mockImplementation();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
  });

  beforeEach(() => {
    processStdoutSpy.mockReset();
  });

  afterAll(async () => {
    processStdoutSpy.mockRestore();
    await app.close();
  });

  it('should write access logs with request id', () => {
    return app.inject({ method: 'GET', url: '/prometheus-metrics' })
      .then(result => {
        expect(processStdoutSpy.mock.calls[0][0])
          .toMatch(/{"timestamp":\d{13},"type":"access","req":{"id":"req-\d","method":"GET","url":"\/prometheus-metrics","remoteAddress":"127\.0\.0\.1"},"res":{"status":200,"contentLength":\d+}}/);
        expect(result.statusCode).toBe(200);
      });
  });

  it('should write access logs with content length 0', () => {
    return app.inject({ method: 'GET', url: '/alive' })
      .then(result => {
        expect(processStdoutSpy.mock.calls[0][0])
          .toMatch(/{"timestamp":\d{13},"type":"access","req":{"id":"req-\d","method":"GET","url":"\/alive","remoteAddress":"127\.0\.0\.1"},"res":{"status":200,"contentLength":0}}/);
        expect(result.statusCode).toBe(200);
      });
  });
});
