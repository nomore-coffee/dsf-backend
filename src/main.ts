import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('DigitalShala API')
    .setDescription('API documentation for DigitalShala backend including Auth, Organization, User, Material, Notice, and Attendance endpoints.')
    .setVersion('1.0')
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Organization', 'Organization management endpoints')
    .addTag('User', 'User management endpoints')
    .addTag('Material', 'Educational material management endpoints')
    .addTag('Notice', 'Notice and announcement endpoints')
    .addTag('Attendance', 'Student attendance tracking endpoints')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger documentation available at: ${await app.getUrl()}/api-docs`);
}
bootstrap();
