"use client";

import { UPDATE_COURSE } from "@/app/graphql/mutations/course";
import createApolloClient from "@/app/lib/client";
import { Class } from "@/type/type";
import React, { useState } from "react";

interface Props {
    course: Class;
    onClose: () => void;
}

export default function EditCourseModal({ course, onClose }: Props) {
    const client = createApolloClient();
    const [courseName, setCourseName] = useState<string>();

    const data = {
        id: Number(course?.id),
        name: courseName != course.name ? courseName : course.name,
    };

    const updatedStudent = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await client.mutate({
                mutation: UPDATE_COURSE,
                variables: data,
            });

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-transparent/50 bg-opacity-45 p-6 border-white backdrop-blur-sm border rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-xl font-bold mb-4">Edit Course</h2>

                    <div className="mb-4">
                        <label htmlFor="id" className="block text-sm font-medium text-white">
                            ID
                        </label>
                        <input
                            readOnly
                            type="id"
                            id="id"
                            defaultValue={course.id}
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
                            defaultValue={course.name}
                            onChange={(e) => setCourseName(e.target.value)}
                            className="mt-1 p-2 block w-full border rounded-md sm:text-sm"
                        />
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
