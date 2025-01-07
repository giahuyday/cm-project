import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { StudentModule } from './student/student.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { StudentGuard } from './common/guards/student.guards';
import { DBConfigModule } from './config/db.config';
import { EnvConfigModule } from './config/env.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/schema.gql',
        }),
        DBConfigModule,
        EnvConfigModule,
        CourseModule,
        StudentModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        // Reflector,
        // {
        //     provide: APP_GUARD,
        //     useClass: StudentGuard,
        // },
        AppResolver,
    ],
})
export class AppModule {}
