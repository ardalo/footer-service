import { Test, TestingModule } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { LoggerModule } from 'nestjs-pino';
import * as pino from 'pino';
import { AppModule } from './app.module';

describe('AppModule (e2e)', () => {
  let app: NestFastifyApplication;
  let logger: pino.Logger;
  let loggerDestination;

  beforeAll(async () => {
    loggerDestination = pino.destination('/dev/null');
    loggerDestination[Symbol.for('pino.metadata')] = true;
    logger = pino(loggerDestination);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        LoggerModule.forRoot({
          pinoHttp: {
            logger: logger
          }
        })
      ]
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
  });

  it('should write access logs', () => {
    return app.inject({ method: 'GET', url: '/alive' })
      .then(() => {
        expect(loggerDestination.lastMsg).toBe('request completed');
        expect(loggerDestination.lastObj).toMatchObject({
          'msg': 'request completed'
        });
      });
  });
});
