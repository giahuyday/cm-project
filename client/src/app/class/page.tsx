import Table from "@/components/table/ClassTable";
import { Class } from "@/type/type";
import createApolloClient from "../lib/client";
import { GET_COURSES } from "../graphql/queries/course";

export default async function course() {
    const client = createApolloClient();

    let courses: Class[] = [];
    try {
        const response = await client.query({
            query: GET_COURSES,
        });

        if (response?.data?.getCourses) courses = response?.data?.getCourses;
    } catch (error) {}

    return (
        <>
            <div className={`h-[100vh] w-full z-1 grid grid-cols-7 grid-rows-${courses.length + 1}`}>
                <div className="mt-[10px] ml-[10px] mb-[10px] mr-[10px] col-span-7">
                    <Table courses={courses} />
                </div>

                <div className="w-full flex justify-center items-center row-span-1 col-span-7">Pagination</div>
            </div>
        </>
    );
}

export const dynamic = "force-dynamic";
