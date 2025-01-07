import React from "react";
import Table from "@/components/table/StudentTable";
import createApolloClient from "../lib/client";
import { Student } from "@/type/type";
import { GET_STUDENTS } from "../graphql/queries/student";

export default async function StudentPage() {
    const client = createApolloClient();
    const response = await client.query({
        query: GET_STUDENTS,
    });

    const students: Student[] = response?.data?.getStudents || [];

    return (
        <>
            <div className={`h-[100vh] w-full z-1 grid grid-cols-7 grid-rows-${students.length + 1}`}>
                <div className="mt-[10px] ml-[10px] mb-[10px] mr-[10px] col-span-7">
                    <Table students={students} />
                </div>
            </div>
            <div className="w-full flex justify-center items-center row-span-1 col-span-7">Pagination</div>
        </>
    );
}

export const dynamic = "force-dynamic";
