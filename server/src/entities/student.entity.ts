import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CourseEntity } from './course.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'student' })
@ObjectType()
export class StudentEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column({ length: 255, unique: true })
    @Field()
    name: string;

    @ManyToOne(() => CourseEntity, (course) => course.students)
    @JoinColumn({ name: 'classId' })
    @Field(() => CourseEntity)
    classId: CourseEntity;
}
