import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //await [id_so].listen(3000)
  await app.listen(60);
}
bootstrap();
