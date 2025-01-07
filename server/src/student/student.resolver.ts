import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentEntity } from 'src/entities/student.entity';
import { StudentService } from './student.service';
import { CreateStudentDto, DeleteStudentDto, StudentByClassDto, StudentDto, UpdateStudentDto } from './dto/student.dto';
import { Roles } from 'src/common/decorators/roles.decorator';

@Resolver(() => StudentEntity)
export class StudentResolver {
    constructor(private studentService: StudentService) {}

    @Roles('admin', 'teacher')
    @Mutation(() => StudentEntity)
    async createStudent(@Args('studentDto') studentDto: CreateStudentDto): Promise<StudentEntity> {
        return await this.studentService.createStudent(studentDto);
    }

    @Roles('admin', 'principal', 'teacher')
    @Query(() => [StudentEntity])
    async getStudents(): Promise<StudentEntity[]> {
        return await this.studentService.getStudents();
    }

    @Roles('admin', 'principal')
    @Query(() => StudentEntity)
    async getStudentById(@Args('studenDto') studentDto: StudentByClassDto): Promise<StudentEntity> {
        return await this.studentService.getStudentById(studentDto?.id);
    }

    @Roles('admin', 'principal', 'teacher')
    @Query(() => [StudentEntity])
    async getStudentByName(@Args('studentDto') studentDto: StudentByClassDto): Promise<StudentEntity[]> {
        return await this.studentService.getStudentByName(studentDto.name);
    }

    @Roles('admin', 'principal', 'teacher')
    @Query(() => [StudentEntity])
    async getStudentByClassName(@Args('studentDto') studentDto: StudentByClassDto): Promise<StudentEntity[]> {
        return await this.studentService.getStudentByClassName(studentDto?.courseName);
    }

    @Roles('admin', 'teacher')
    @Mutation(() => StudentEntity)
    async updateStudent(@Args('studentDto') studentDto: UpdateStudentDto): Promise<StudentEntity> {
        return await this.studentService.updateStudent(studentDto?.id, studentDto);
    }

    @Roles('admin', 'teacher')
    @Mutation(() => Boolean)
    async deleteStudent(@Args('studentDto') studentDto: DeleteStudentDto): Promise<boolean> {
        return await this.studentService.deleteStudent(studentDto);
    }
}
