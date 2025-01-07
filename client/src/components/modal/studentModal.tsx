"use client";

import { UPDATE_STUDENT } from "@/app/graphql/mutations/student";
import { GET_COURSES } from "@/app/graphql/queries/course";
import createApolloClient from "@/app/lib/client";
import { Class, Student } from "@/type/type";
import React, { useEffect, useState } from "react";

interface Props {
    student: Student;
    onClose: () => void;
}

export default function EditStudentModal({ student, onClose }: Props) {
    const client = createApolloClient();
    const [studentName, setStudentName] = useState<string>();
    const [classId, setClassId] = useState<number>(student.classId.id);
    const [courseName, setCourses] = useState<Class[]>([]);
    const data = {
        id: Number(student?.id),
        name: studentName != student.name ? String(studentName) : String(student?.name),
        classId: classId != student.classId.id ? Number(classId) : Number(student.classId.id),
    };

    const updatedStudent = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await client.mutate({
                mutation: UPDATE_STUDENT,
                variables: data,
            });

        } catch (error) {
            console.error(error);
        }
    };

    const fetchClass = async () => {
        try {
            const response = await client.query({
                query: GET_COURSES,
            });
            setCourses(response?.data?.getCourses);
        } catch (error: any) {
            console.error(error.response.data.devMessage);
        }
    };

    useEffect(() => {
        fetchClass();
    }, []);
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-transparent/50 backdrop:blur-sm bg-opacity-45 p-6 border-white border rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-xl font-bold mb-4">Edit Student</h2>

                    <div className="mb-4">
                        <label htmlFor="id" className="block text-sm font-medium text-white">
                            ID
                        </label>
                        <input
                            readOnly
                            type="id"
                            id="id"
                            defaultValue={student.id}
                            className="mt-1 p-2 block w-full border rounded-md sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-white">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            defaultValue={student.name}
                            onChange={(e) => setStudentName(e.target.value)}
                            className="mt-1 p-2 block w-full border rounded-md sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="class" className="block text-sm font-medium text-white">
                            Class
                        </label>
                        <select
                            id="class"
                            className="mt-1 p-2 block w-full border rounded-md sm:text-sm"
                            value={classId}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setClassId(Number(e.target.value))}
                        >
                            {courseName.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={updatedStudent}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
