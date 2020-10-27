import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

export default class SwaggerUiConfigurer {
  static configure(app: NestFastifyApplication): void {
    SwaggerModule.setup('/', app, SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('Footer Service')
      .setDescription(`<a href="${app.get(ConfigService).get('app.documentation-url')}" target="_blank">footer-service documentation</a>`)
      .build()));
  }
}
