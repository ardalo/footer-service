import { Test, TestingModule } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from '../app.module';
import ApiDocumentationConfigurer from './api-documentation.configurer';

describe('ApiDocumentationConfigurer (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    ApiDocumentationConfigurer.configure(app);
    await app.init();
  });

  it('should set up Swagger UI', () => {
    return app.inject({ method: 'GET', url: '/apidoc/static/index.html' })
      .then(({ statusCode, headers, payload }) => {
        expect(statusCode).toBe(200);
        expect(headers['content-type']).toBe('text/html; charset=UTF-8');
        expect(payload).toContain('<title>Swagger UI</title>');
        expect(payload).toContain('<div id="swagger-ui"></div>');
      });
  });

  it('should make Swagger UI accessible under /apidoc', () => {
    return app.inject({ method: 'GET', url: '/apidoc' })
      .then(({ statusCode, headers, payload }) => {
        expect(statusCode).toBe(302);
        expect(headers['location']).toBe('./apidoc/static/index.html');
      });
  });

  it('should provide OpenAPI documentation', () => {
    return app.inject({ method: 'GET', url: '/apidoc/json' })
      .then(({ statusCode, headers, payload }) => {
        expect(statusCode).toBe(200);
        expect(headers['content-type']).toBe('application/json; charset=utf-8');
        expect(JSON.parse(payload).openapi).toBe('3.0.0');
      });
  });
});
