import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Dislex Test API')
    .setDescription('Operaciones con DislexTest.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, document);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

