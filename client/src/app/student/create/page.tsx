"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Class } from "@/type/type";
import ToastNotification from "@/components/toast/toastify";
import createApolloClient from "@/app/lib/client";
import { GET_COURSES } from "@/app/graphql/queries/course";
import { CREATE_STUDENT } from "@/app/graphql/mutations/student";

export default function CreateStudentPage() {
    const client = createApolloClient();
    const router = useRouter();
    const studentNameRef = useRef<HTMLInputElement>(null);
    const [classId, setClassId] = useState<number>(1);
    const [courseName, setCourses] = useState<Class[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const studentName = studentNameRef.current?.value || "";
        const data = {
            name: studentName,
            classId: Number(classId),
        };
        try {
            const response = await client.mutate({
                mutation: CREATE_STUDENT,
                variables: data,
            });

            toast.success("Student created successfully!");
            setTimeout(() => {
                router.push("/student");
            }, 4000);
        } catch (error: any) {
            toast.error(error);
            console.error("Failed to add student:");
        }
    };

    const fetchClass = async () => {
        try {
            const response = await client.query({
                query: GET_COURSES,
            });
            setCourses(response?.data?.getCourses);
        } catch (error: any) {
            toast.error(error.response.data.devMessage);
        }
    };

    useEffect(() => {
        fetchClass();
    }, []);

    return (
        <>
            <div className="w-full h-[100vh] flex justify-center items-center">
                <div className="justify-center">
                    <form
                        className="grid grid-rows-1 gap-3 border backdrop:blur-xl p-20 rounded"
                        onSubmit={handleSubmit}
                    >
                        <h1 className="text-2xl">Create new student</h1>

                        <div className="grid">
                            <label htmlFor="name">Student name</label>
                            <input
                                className="p-2 rounded"
                                type="text"
                                id="name"
                                placeholder="Fill student name"
                                ref={studentNameRef}
                            />
                        </div>

                        <div className="grid">
                            <label htmlFor="grade">Student class</label>
                            <select
                                className="p-2 rounded"
                                id="grade"
                                value={classId}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                    setClassId(Number(e.target.value))
                                }
                            >
                                {courseName.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn-primary p-2">
                            Create student
                        </button>
                    </form>
                </div>
            </div>
            <ToastNotification />
        </>
    );
}
