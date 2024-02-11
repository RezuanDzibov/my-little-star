import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import globalConfig from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(globalConfig.PROJECT_NAME)
    .setDescription(globalConfig.PROJECT_DESCRIPTION)
    .setVersion(globalConfig.PROJECT_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(globalConfig.BACKEND_API_PORT);
}
bootstrap();
