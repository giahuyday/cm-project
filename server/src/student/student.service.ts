import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from 'src/entities/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto, DeleteStudentDto, UpdateStudentDto } from './dto/student.dto';
import { CourseEntity } from 'src/entities/course.entity';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(StudentEntity)
        private readonly studentRepository: Repository<StudentEntity>,

        @InjectRepository(CourseEntity)
        private readonly courseRepository: Repository<CourseEntity>,
    ) {}

    async createStudent(studentData: CreateStudentDto): Promise<StudentEntity> {
        const student = await this.studentRepository.findOne({
            where: {
                name: studentData.name,
            },
        });

        const studentClass = await this.courseRepository.findOne({
            where: {
                id: studentData.classId,
            },
        });

        if (!student && studentClass) {
            const newStudent = this.studentRepository.create({
                name: studentData?.name,
                classId: studentClass,
            });

            return await this.studentRepository.save(newStudent);
        }

        throw new ConflictException();
    }

    async getStudents(): Promise<StudentEntity[]> {
        return await this.studentRepository.find({ relations: { classId: true } });
    }

    async getStudentById(studentData: number): Promise<StudentEntity> {
        const student = await this.studentRepository.findOne({
            where: { id: studentData },
            relations: { classId: true },
        });
        if (!student) throw new NotFoundException('Student not found');

        return student;
    }

    async getStudentByName(studentName: string): Promise<StudentEntity[]> {
        const student = await this.studentRepository
            .createQueryBuilder('student')
            .leftJoinAndSelect('student.classId', 'class')
            .where('student.name ilike :name', { name: `%${studentName}%` })
            .getMany();

        if (!student) throw new NotFoundException();

        return student;
    }

    async getStudentByClassName(courseName: string): Promise<StudentEntity[]> {
        // #TODO: use left join to get All students by classname with 1 query
        const studenByClass = await this.studentRepository
            .createQueryBuilder('student')
            .leftJoinAndSelect('student.classId', 'class')
            .where('class.name = :courseName', { courseName: courseName })
            .getMany();

        if (studenByClass) return studenByClass;
        throw new NotFoundException();
    }

    async updateStudent(id: number, studentData: UpdateStudentDto): Promise<StudentEntity> {
        const student = await this.studentRepository.findOne({ where: { id: id }, relations: { classId: true } });

        if (!student) throw new NotFoundException();

        if (studentData?.name) {
            const nameCheck = await this.studentRepository.findOne({ where: { name: studentData?.name } });
            if (nameCheck) throw new ConflictException();
            student.name = studentData.name;
        }

        const studenByClass = await this.studentRepository
            .createQueryBuilder('student')
            .leftJoinAndSelect('student.classId', 'class')
            .where('class.id = :classId', { classId: studentData?.classId })
            .getOne();

        if (studenByClass && student.classId != studenByClass?.classId) {
            student.classId = studenByClass.classId;
        }

        await this.studentRepository.save(student);

        return await this.studentRepository.findOne({ where: { id: id }, relations: { classId: true } });
    }

    async deleteStudent(studentData: DeleteStudentDto): Promise<boolean> {
        const student = await this.studentRepository.findOne({ where: { id: studentData.id } });

        if (!student) return true;
        await this.studentRepository.remove(student);

        return true;
    }
}
