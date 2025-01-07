import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { GraphQLErrorFilter } from './common/filter/graphql.exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
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
