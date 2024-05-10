import { AppModule } from '@app/src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { config } from 'dotenv';

config();

const bootstrap = async () => {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'fatal', 'error', 'warn'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });
  await app
    .listen(PORT)
    .then(() =>
      console.log(
        `The Nest.js Backend Application is up and running on ${PORT}`,
      ),
    )
    .catch((err) => console.log(err));
};

bootstrap();
