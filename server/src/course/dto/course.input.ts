import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
    @Field()
    name: string;
}

@InputType()
export class UpdateCourseInput {
    @Field({ nullable: true })
    name?: string;
}

@InputType()
export class DeleteCourseInput {
    @Field()
    id: number;
}
