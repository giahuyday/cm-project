import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from 'src/entities/course.entity';
import { StudentEntity } from 'src/entities/student.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                type: 'postgres',
                host: config.get('DB_HOST'),
                port: Number(config.get('DB_PORT')),
                username: config.get('DB_USERNAME'),
                password: config.get('DB_PASSWORD'),
                entities: [StudentEntity, CourseEntity],
                database: config.get('DB_DATABASE'),
                retryAttempts: 3,
                autoLoadEntities: true,
                migrationsRun: true,
                synchronize: false,
            }),
        }),
    ],
})
export class DBConfigModule {}
