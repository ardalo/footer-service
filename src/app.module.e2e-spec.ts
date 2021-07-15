import { Test, TestingModule } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as stream from 'stream';
import ApplicationLoggerModule from './logging/application-logger.module';
import ApplicationLogger from './logging/application-logger';
import AppModule from './app.module';
import AccessLoggerMiddleware from './logging/access-logger.middleware';
import HealthController from './health/health.controller';

describe('AppModule (e2e)', () => {
  // let app: NestFastifyApplication;
  // const logStream = new stream.Writable();
  // let logCapture: string;
  //
  // beforeAll(async () => {
  //   logStream._write = (chunk, encoding, next) => {
  //     logCapture += chunk.toString();
  //     next();
  //   };
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [
  //       AppModule
  //     ],
  //     providers: [AccessLoggerMiddleware]
  //   }).compile();
  //
  //   app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter(), { bufferLogs: true });
  //   app.useLogger(app.get(ApplicationLogger));
  //   app.get<ApplicationLogger>(ApplicationLogger).setLogStream(logStream)
  //   app.get<AccessLoggerMiddleware>(AccessLoggerMiddleware).setLogStream(logStream)
  //   await app.init();
  // });
  //
  // beforeEach(() => {
  //   logCapture = '';
  // });
  //
  // // TODO: Hier wird ein applicarion log getestet
  // it('should write access logs', () => {
  //
  //   // let healthController = app.get<HealthController>(HealthController);
  //
  //   // jest.spyOn(healthController, 'alive').mockImplementation(() => );
  //
  //   return app.inject({ method: 'GET', url: '/alive' })
  //     .then(() => {
  //       expect(logCapture)
  //         .toMatch(/{"timestamp":\d{13},"type":"application","level":"INFO","message":"MetricsController called","requestId":"req-1"}/);
  //
  //       // expect(logCapture)
  //       //   .toMatch(/{"timestamp":\d{13},"type":"access"}/);
  //     });
  // });
});
