import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { StudentEntity } from './student.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'course' })
@ObjectType()
export class CourseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column({ length: 255, unique: true })
    @Field()
    name: string;

    @OneToMany(() => StudentEntity, (student) => student.classId, { cascade: true })
    students: StudentEntity[];
}
