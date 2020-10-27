import { Test, TestingModule } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from '../app.module';
import SwaggerUiConfigurer from './swagger-ui.configurer';

describe('SwaggerUiConfigurer (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    SwaggerUiConfigurer.configure(app);
    await app.init();
  });

  it('should set up Swagger UI', () => {
    return app.inject({ method: 'GET', url: '/static/index.html' })
      .then(({ statusCode, headers, payload }) => {
        expect(statusCode).toBe(200);
        expect(headers['content-type']).toBe('text/html; charset=UTF-8');
        expect(payload).toContain('<title>Swagger UI</title>');
        expect(payload).toContain('<div id="swagger-ui"></div>');
      });
  });

  it('should make Swagger UI accessible under root path', () => {
    return app.inject({ method: 'GET', url: '/' })
      .then(({ statusCode, headers, payload }) => {
        expect(statusCode).toBe(302);
        expect(headers['location']).toBe('./static/index.html');
      });
  });
});
