"use client";
import { Class } from "@/type/type";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ToastNotification from "../toast/toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import createApolloClient from "@/app/lib/client";
import { DELETE_COURSE } from "@/app/graphql/mutations/course";
import { GET_COURSE_BY_NAME } from "@/app/graphql/queries/course";
import EditCourseModal from "../modal/classModal";

interface Props {
    courses: Class[];
}

export default function Table({ courses }: Props) {
    const [courseList, setCourseList] = useState<Class[]>(courses);
    const [courseName, setCourseName] = useState<string>("");

    const [isModalOpen, setIsModalOpen] = useState(false); // Quản lý trạng thái mở/đóng modal
    const [selectedCourse, setSelectedCourse] = useState<Class | null>(null); // Sinh viên được chọn để chỉnh sửa

    const handleOpenModal = (course: Class) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedCourse(null);
        setIsModalOpen(false);
    };

    const handleSearchCourse = async () => {
        try {
            const client = createApolloClient();
            
            const response = await client.query({
                query: GET_COURSE_BY_NAME,
                variables: { name: courseName },
            });

            setCourseList(response?.data.getCourseByName || []);
        } catch (error: any) {
            console.error("Error:", error.message);
            toast.error("Failed to search courses.");
        }
    };

    const handleDeleteCourse = async (id: number) => {
        try {
            const client = createApolloClient();
            const response = await client.mutate({
                mutation: DELETE_COURSE,
                variables: { id: Number(id) },
            });

            if (response.data?.deleteCourseById == true) {
                toast.success("Delete Class Success!");
                const updatedCourses = courseList.filter((course) => course.id !== id);
                setCourseList(updatedCourses);
            } else {
                toast.error("Failed to delete class.");
            }
        } catch (error: any) {
            console.error("Error:", error.message);
            toast.error("An error occurred while deleting the class.");
        }
    };

    useEffect(() => { }, [setCourseList]);
    return (
        <>
            {isModalOpen && <EditCourseModal course={selectedCourse as Class} onClose={handleCloseModal} />}
            <div id="search" className="w-full mb-2 col-span-7 md:flex justify-evenly items-center xs:hidden">
                <div id="filter" className="relative group p-2">
                    <div className="cursor-pointer group-hover:block uppercase">filter</div>
                    <div className="absolute hidden group-hover:block top-0 mt-[20px] left-0  backdrop-blur-sm bg-white/90 bg-white z-10 p-2 border shadow-lg text-black min-w-[5rem]">
                        <label className="flex items-center gap-2 hover:bg-gray-100 p-1 cursor-pointer">
                            <input type="radio" name="filterType" value="Filter 1" className="cursor-pointer" />
                            <span className="capitalize">Filter 1</span>
                        </label>
                    </div>
                </div>
                <div className="flex border group rounded max-h-[4rem] p-2 relative">
                    <input
                        type="text"
                        className="bg-transparent text-white flex-grow"
                        placeholder="Fill course name to search"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    />
                    <button type="button" onClick={handleSearchCourse}>
                        <FontAwesomeIcon icon={faSearch} className="fa-fw" />
                    </button>
                </div>
            </div>
            <table className={`w-full table-fixed col-span-7 border-gray-300 row-span-${courses.length + 1}`}>
                <thead>
                    <tr className="bg-black text-white">
                        <th className="border border-gray-300 px-4 py-2 text-left">Class ID</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Class Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">View</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Edit</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {courseList.map((course) => (
                        <tr key={course.id} className="m-h-[3rem]">
                            <td className="border border-gray-300 px-4 py-2">{course.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{course.name}</td>
                            <td className="w-[10rem] border border-gray-300 px-4 py-2">
                                <button className="p-2 rounded bg-blue-600 hover:bg-blue-800">
                                    <Link href={`/class/${course.id}`} className="">
                                        View Detail
                                    </Link>
                                </button>
                            </td>
                            <td className="w-[5rem] border border-gray-300 px-4 py-2">
                                <button className="px-[1rem] py-2 rounded btn-warning"
                                    onClick={() => handleOpenModal(course)}>Edit</button>
                            </td>
                            <td className="w-[5rem] border border-gray-300 px-4 py-2">
                                <button className="p-2 btn-danger" onClick={() => handleDeleteCourse(course.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastNotification />
        </>
    );
}
