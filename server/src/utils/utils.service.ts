import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UtilsService {
    private readonly DATA_FILE = path.join(__dirname, '../../data/data.json');

    readData = () => {
        const data = fs.readFileSync(this.DATA_FILE, 'utf8');
        return JSON.parse(data);
    };

    writeData = (data: any) => {
        fs.writeFileSync(this.DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    };

    // Check if existed any course with required Id
    checkCourseExist = (coursesArr: any, courseId: number) => {
        const courseIdx = coursesArr.findIndex((course: { id: number }) => course.id === Number(courseId));

        if (courseIdx !== -1) {
            return true;
        } else {
            return false;
        }
    };

    // Check if classname existed or not
    checkCourseName = (courseArr: any, courseName: string) => {
        const courseIdx = courseArr.findIndex((course: { name: string }) => course.name == courseName);

        if (courseIdx !== -1) {
            return true;
        } else {
            return false;
        }
    };

    // Check if studen name existed or not
    checkStudentName = (studentArr: any, studentName: string) => {
        const studentIdx = studentArr.filter((student: { name: string }) => student.name === studentName);

        if (studentIdx.length > 0) {
            return true;
        }
        return false;
    };

    // Check if has any student enrolled in course or not
    checkEnrolledStudents = (studentArr: any, courseId: number) => {
        const students = studentArr.filter((student: { classId: number }) => student.classId === courseId);

        if (students.length > 0) {
            return true;
        }
        return false;
    };

    // Serialize input data to make sure that a student must attend a class and that the class exists
    checkNewStudentClass = (studentData: any, studentArr: any, courseArr: any) => {
        const courseId = studentData['classId'];

        if (this.checkCourseExist(courseArr, courseId) && !this.checkStudentName(studentArr, studentData?.name)) {
            return true;
        }
        return false;
    };
}
