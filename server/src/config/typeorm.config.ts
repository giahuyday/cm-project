import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();
// Config validation
export default new DataSource({
    type: 'postgres',
    host: configService.getOrThrow('DB_HOST'),
    port: configService.getOrThrow('DB_PORT'),
    username: configService.getOrThrow('DB_USERNAME'),
    password: configService.getOrThrow('DB_PASSWORD'),
    database: configService.getOrThrow('DB_DATABASE'),
    entities: ['./src/entities/*.entity{.ts,.js}'],
    migrations: ['./src/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
});
