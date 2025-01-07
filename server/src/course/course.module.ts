import { Global, Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseEntity } from 'src/entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from 'src/entities/student.entity';
import { CourseResolver } from './course.resolver';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([CourseEntity, StudentEntity])],
    providers: [CourseService, CourseResolver],
    controllers: [],
})
export class CourseModule {}
