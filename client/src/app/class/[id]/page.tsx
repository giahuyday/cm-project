import Image from "next/image";
import createApolloClient from "@/app/lib/client";
import { GET_COURSE, GET_COURSES } from "@/app/graphql/queries/course";

interface Class {
    id: number;
    name: string;
}
const client = createApolloClient();

export const revalidate = 10;
export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateStaticParams() {
    const response = await client.query({
        query: GET_COURSES,
    });

    const courses: Class[] = response?.data?.getCourses;

    return courses.map((course) => ({
        id: String(course.id),
    }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

    const response = await client.query({
        query: GET_COURSE,
        variables: { id: parseInt(id) },
    });

    const course: Class = response?.data?.getCourseById;

    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <div id="avatar" className="flex items-center w-full h-full rounded text-white">
                <div id="intro" className="flex-1">
                    <div className="flex justify-center items-center mb-[20px]">
                        <Image
                            className="dark:invert flex justify-center"
                            src="/next.svg"
                            alt="Next.js logo"
                            width={180}
                            height={38}
                            priority
                        />
                    </div>
                    <div className="flex justify-center gap-5">
                        <button type="button" className="p-2 rounded min-w-1/3 bg-blue-600 hover:bg-blue-700">
                            Edit Avatar
                        </button>
                        <button type="button" className="p-2 min-w-1/3 btn-danger">
                            Remove
                        </button>
                    </div>
                </div>
                <div id="detail" className="w-1/2 border-l-4 border-l-white col-span-4">
                    <form className="grid grid-rows-1 gap-3 rounded p-10">
                        <h1 className="text-2xl uppercase">create new course</h1>

                        <div className="grid">
                            <label htmlFor="id">Course ID</label>
                            <input
                                readOnly
                                className="p-2 rounded w-1/2 min-w-fit"
                                type="text"
                                id="id"
                                placeholder="Fill course name"
                                value={course?.id}
                            />
                        </div>

                        <div className="grid">
                            <label htmlFor="name">Course name</label>
                            <input
                                readOnly
                                className="p-2 rounded w-1/2 min-w-fit"
                                type="text"
                                id="name"
                                placeholder="Fill course name"
                                value={course?.name}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
