import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: errors => {
        return new HttpException({ message: 'Validation Errors', errors }, HttpStatus.UNPROCESSABLE_ENTITY);
      },
     whitelist: true,
     forbidNonWhitelisted: true,
     transform: true,
   }),
  );
  app.enableCors({
    origin: 'http://localhost:5173', // Cambia esto a la URL de tu aplicación React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  await app.listen(5000);
}
bootstrap();
