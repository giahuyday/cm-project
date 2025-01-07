import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { CourseEntity } from 'src/entities/course.entity';

@InputType()
export class StudentDto {
    @Field()
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    id: number;

    @Field()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @Field()
    @IsOptional()
    classId: CourseEntity;
}

@InputType()
export class CreateStudentDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @Field()
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    classId: number;
}

@InputType()
export class StudentByClassDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsInt()
    @Min(1)
    id?: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    courseName?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    name?: string;

    @Field({ nullable: true })
    @IsOptional()
    classId?: number;
}

@InputType()
export class UpdateStudentDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsInt()
    @Min(1)
    id?: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    name?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsInt()
    @Min(1)
    classId?: number;
}

@InputType()
export class DeleteStudentDto {
    @Field()
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    id: number;
}
