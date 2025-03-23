import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './middlewares/prismaErros.middlewares';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  app.enableCors({
    origin: '*',
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
