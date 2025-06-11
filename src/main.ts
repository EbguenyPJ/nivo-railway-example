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
  const port = process.env.PORT
    ? parseInt(process.env.PORT, 10)
    : (() => {
        console.warn(
          '⚠️ WARNING: process.env.PORT is undefined, defaulting to 8080',
        );
        return 8080;
      })();

  await app.listen(port, '0.0.0.0'); // ✅ escucha en todas las interfaces

  // ✅ Log explícito del puerto en Railway
  console.log(`🚀 App running on port ${port}`);
}
bootstrap();
