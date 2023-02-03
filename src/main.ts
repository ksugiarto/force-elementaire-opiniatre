// Generic Imports
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

// App Module Import
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  // Get environment values for PORT and HOST
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const host = configService.get('HOST');

  await app.listen(port, host);
}
bootstrap();
