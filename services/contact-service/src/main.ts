import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'error', 'warn'],
  });

  const configService = app.get(ConfigService);
  const port: string = configService.getOrThrow('PORT');
  const swaggerPath: string = configService.getOrThrow('SWAGGER_PATH');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('NestJS Review API')
    .setDescription(
      'A microservice for handling contact form submissions and email communications.',
    )
    .setVersion('1.0')
    .addServer(swaggerPath)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: '*',
  });

  await app.listen(port ?? 3000);

  const logger = new Logger('ContactService');
  const url = await app.getUrl();

  logger.log(`🚀 Server running on ${url}`);
  logger.log(`📚 Swagger docs available at ${url}/swagger`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
