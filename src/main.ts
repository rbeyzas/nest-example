import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
// gelen tüm requestleri doğrulamak için global bir pipe ekledik
// uygulammaı gelen tüm istekleri doğrulamaya çalışacak
// mesela boş bir request atılmış olabilir. bunu kontrol edeceğiz
