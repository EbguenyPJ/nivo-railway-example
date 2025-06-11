import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS temporalmente (útil para Railway o frontend externo)
  app.enableCors();

  // Middleware personalizado
  app.use(loggerGlobal);

  // Validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Forzamos parseo correcto del puerto
  const port = parseInt(process.env.PORT || '3000', 10);
  await app.listen(port);

  // ✅ Log explícito del puerto en Railway
  console.log(`🚀 App running on port ${port}`);
}
bootstrap();
