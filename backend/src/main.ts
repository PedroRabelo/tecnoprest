import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConflictInterceptor } from './common/errors/interceptors/conflict.interceptor';
import { DatabaseInterceptor } from './common/errors/interceptors/database.interceptor';
import { NotFoundInterceptor } from './common/errors/interceptors/notfound.interceptor';
import { UnauthorizedInterceptor } from './common/errors/interceptors/unauthorized.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // apply PrismaClientExceptionFilter to entire application, requires HttpAdapterHost because it extends BaseExceptionFilter
  const { httpAdapter } = app.get(HttpAdapterHost);

  const config = new DocumentBuilder()
    .setTitle('TecnoPrest - Management')
    .setDescription('REST API sistema de gestão de frota')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, { customSiteTitle: 'Management' });

  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());

  await app.listen(3333);
}
bootstrap();
