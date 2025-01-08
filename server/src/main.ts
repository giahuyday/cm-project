import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { GraphQLErrorFilter } from './common/filter/graphql.exception.filter';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: configService.get<string>('ALLOW_ORIGIN').split(','),
        methods: configService.get<string>('ALLOW_METHOD').split(','),
        allowedHeaders: configService.get<string>('ALLOW_HEADER').split(','),
    });

    app.useGlobalFilters(new HttpExceptionFilter(), new GraphQLErrorFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    );
    await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
