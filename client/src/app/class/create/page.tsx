"use client";
import axios from "axios";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import ToastNotification from "@/components/toast/toastify";
import createApolloClient from "@/app/lib/client";
import { CREATE_COURSE } from "@/app/graphql/mutations/course";

export default function CreateCoursePage() {
    const router = useRouter();
    const courseNameRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const courseName = courseNameRef.current?.value || "";

        try {
            const client = createApolloClient();
            const response = await client.mutate({
                mutation: CREATE_COURSE,
                variables: { name: courseName },
            });
            
            if (response?.data?.createCourse.id) toast.success("Class created successfully!");

            setTimeout(() => {
                router.push("/class");
            }, 4000);
        } catch (error: any) {
            toast.error("Create new class failed");
            console.error(error);
        }
    };

    return (
        <>
            <div className="w-full h-[100vh] flex justify-center items-center">
                <div className="justify-center">
                    <form
                        className="grid grid-rows-1 gap-3 border backdrop:blur-xl p-20 rounded"
                        onSubmit={handleSubmit}
                    >
                        <h1 className="text-2xl">Create new course</h1>

                        <div className="grid">
                            <label htmlFor="name">Course name</label>
                            <input
                                className="p-2 rounded"
                                type="text"
                                id="name"
                                placeholder="Fill course name"
                                required
                                ref={courseNameRef}
                            />
                        </div>
                        <button type="submit" className="btn-primary p-2">
                            Create course
                        </button>
                    </form>
                </div>
            </div>
            <ToastNotification />
        </>
    );
}
