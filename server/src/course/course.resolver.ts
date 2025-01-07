import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { CourseEntity } from 'src/entities/course.entity';
import { CreateCourseDto, DeleteCourseDto } from './dto/course.dto';
import { Roles } from 'src/common/decorators/roles.decorator';

@Resolver(() => CourseEntity)
export class CourseResolver {
    constructor(private classServices: CourseService) {}

    @Roles('admin', 'principal')
    @Mutation(() => CourseEntity)
    async createCourse(@Args('courseDto') courseDto: CreateCourseDto): Promise<CourseEntity> {
        return await this.classServices.createCourse(courseDto);
    }

    @Roles('admin', 'principal')
    @Query(() => CourseEntity)
    async getCourseById(@Args('id', { type: () => Int }) id: number) {
        return await this.classServices.getCourseById(id);
    }

    @Roles('admin', 'principal')
    @Query(() => [CourseEntity])
    async getCourses(): Promise<CourseEntity[]> {
        return await this.classServices.getCourses();
    }

    @Roles('admin', 'principal')
    @Query(() => [CourseEntity])
    async getCourseByName(@Args('courseDto') courseDto: CreateCourseDto): Promise<CourseEntity[]> {
        return await this.classServices.getCourseByName(courseDto?.name);
    }

    @Roles('admin', 'principal')
    @Mutation(() => Boolean)
    async deleteCourseById(@Args('courseDto') courseDto: DeleteCourseDto): Promise<boolean> {
        console.log(courseDto);
        return this.classServices.deleteCourse(courseDto);
    }

    @Roles('admin', 'principal')
    @Mutation(() => CourseEntity)
    async updateCourseById(
        @Args('id') id: number,
        @Args('courseDto') courseDto: CreateCourseDto,
    ): Promise<CourseEntity> {
        return this.classServices.updateCourse(id, courseDto);
    }
}
