import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

export default class SwaggerUiConfigurer {
  static configure(app: NestFastifyApplication): void {
    SwaggerModule.setup('/', app, SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle(app.get(ConfigService).get('app.name'))
      .setDescription(`<a href="${app.get(ConfigService).get('app.documentationUrl')}" target="_blank">Go to documentation</a>`)
      .build()));
  }
}
