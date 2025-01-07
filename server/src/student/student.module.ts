import { Global, Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentEntity } from 'src/entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from 'src/entities/course.entity';
import { StudentResolver } from './student.resolver';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([StudentEntity, CourseEntity])],
    providers: [StudentService, StudentResolver],
    controllers: [],
})
export class StudentModule {}
