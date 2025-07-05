import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  //Config Swagger to API Documentation
  const config = new DocumentBuilder()
    .setTitle('📨 API - Users & Messages')
    .setDescription(
      `Esta API permite crear usuarios y enviar mensajes asociados a cada usuario.
      
Endpoints disponibles:
- Crear usuario
- Crear mensaje para usuario
- Listar mensajes de un usuario

Base de datos: MySQL + Prisma ORM.
`,
    )
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Messages')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // Ruta accesible en localhost:3000/docs

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
