import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { HttpExceptionFilter } from '@app/shared/filters/http-exception.filter';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import httpToCurl from 'http-to-curl';
httpToCurl();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useLogger(app.get(Logger));
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableVersioning({ type: VersioningType.URI });
  app.setGlobalPrefix('api');

  app.use(helmet());

  // enable cors
  app.enableCors();

  // validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = configService.get<number>('app.port') || 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
