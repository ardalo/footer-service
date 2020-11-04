import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

export default class SwaggerUiConfigurer {
  static configure(app: NestFastifyApplication): void {
    SwaggerModule.setup('/', app, SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle(app.get(ConfigService).get('APP_NAME'))
      .setDescription(`<a href="${app.get(ConfigService).get('APP_DOCUMENTATION_URL')}" target="_blank">Go to documentation</a>`)
      .build()));
  }
}
