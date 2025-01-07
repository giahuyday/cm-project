import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

@InputType()
export class CourseDto {
    @Field()
    @IsInt()
    @Min(1)
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;
}

@InputType()
export class CreateCourseDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;
}

@InputType()
export class DeleteCourseDto {
    @Field()
    @IsInt()
    @Min(1)
    @IsNotEmpty()
    id: number;
}
