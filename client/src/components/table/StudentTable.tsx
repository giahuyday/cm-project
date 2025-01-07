"use client";
import Link from "next/link";
import { Student } from "@/type/type";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ToastNotification from "../toast/toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { GET_STUDENTS_BY_CLASSNAME, GET_STUDENTS_BY_NAME } from "@/app/graphql/queries/student";
import createApolloClient from "@/app/lib/client";
import { DELETE_STUDENT } from "@/app/graphql/mutations/student";
import EditStudentModal from "../modal/studentModal";

interface Props {
    students: Student[];
}

export default function Table({ students }: Props) {
    const [studentList, setStudentList] = useState<Student[]>(students);
    const [studentName, setStudentName] = useState<string>("");
    const [searchApi, setSearchApi] = useState<any>("");
    const [isModalOpen, setIsModalOpen] = useState(false); // Quản lý trạng thái mở/đóng modal
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null); // Sinh viên được chọn để chỉnh sửa

    const filter = [
        {
            id: 1,
            filterType: "class",
            filterApi: GET_STUDENTS_BY_CLASSNAME,
        },
        {
            id: 2,
            filterType: "student",
            filterApi: GET_STUDENTS_BY_NAME,
        },
    ];

    const handleOpenModal = (student: Student) => {
        setSelectedStudent(student); 
        setIsModalOpen(true); 
    };

    const handleCloseModal = () => {
        setSelectedStudent(null); 
        setIsModalOpen(false); 
    };

    const handleSearchStudent = async () => {
        try {
            const client = createApolloClient();
            const response = await client.query({
                query: searchApi,
                variables: { searchQuery: studentName },
            });

            setStudentList(response?.data?.getStudentByName || response?.data?.getStudentByClassName || []);
        } catch (error: any) {
            console.error("Error:", error.response?.data?.devMessage || error.message);
        }
    };

    const handleDeleteStudent = async (id: number) => {
        try {
            const client = createApolloClient();
            const response = await client.mutate({
                mutation: DELETE_STUDENT,
                variables: { id: Number(id) },
            });

            if (response.data?.deleteStudent == true) {
                toast.success("Delete Student Success!");
                const updatedStudents = studentList.filter((student) => student.id !== id);
                setStudentList(updatedStudents);
            } else {
                toast.error("Failed to delete student.");
            }
        } catch (error: any) {
            toast.error("An error occurred while deleting the student.", error?.extentions?.devMessage);
            console.error("Error:", error?.extentions?.devMessage);
        }
    };

    useEffect(() => {}, [setStudentList]);

    return (
        <>
            {isModalOpen && <EditStudentModal student={selectedStudent as Student} onClose={handleCloseModal} />}
            <div id="search" className="w-full mb-2 col-span-7 md:flex justify-evenly items-center xs:hidden">
                <div id="filter" className="relative group">
                    <div className="cursor-pointer group-hover:block uppercase">filter</div>
                    <div className="absolute hidden group-hover:block top-0 mt-[20px] left-0  backdrop-blur-sm bg-white/90 bg-white z-10 p-2 border shadow-lg text-black min-w-[5rem]">
                        {filter.map((filtering) => (
                            <label
                                key={filtering.id}
                                className="flex items-center gap-2 hover:bg-gray-100 p-1 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="filterType"
                                    value={filtering.id}
                                    className="cursor-pointer"
                                    onChange={(e) => setSearchApi(filtering?.filterApi)}
                                />
                                <span className="capitalize">{filtering.filterType}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex border group rounded max-h-[4rem] p-4 relative">
                    <input
                        type="text"
                        className="bg-transparent flex-grow text-white"
                        placeholder="Fill student name to search"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                    />
                    <button type="button" onClick={handleSearchStudent}>
                        <FontAwesomeIcon icon={faSearch} className="fa-fw" />
                    </button>
                </div>
            </div>

            <table className={`w-full table-fixed col-span-7 border-gray-300 row-span-${students.length + 1}`}>
                <thead>
                    <tr className="bg-black text-white">
                        <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Student Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Class ID</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Class Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">View</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Edit</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {studentList.map((student) => (
                        <tr key={student.id} className="m-h-[3rem]">
                            <td className="border border-gray-300 px-4 py-2">{student.id}</td>
                            <td className="border border-gray-300 px-4 py-2 overflow-hidden">{student.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{student.classId?.id}</td>
                            <td className="border border-gray-300 px-4 py-2 overflow-x-hidden">
                                {student.classId?.name}
                            </td>
                            <td className="w-[10rem] border border-gray-300 px-4 py-2">
                                <button className="p-2 rounded bg-blue-600 hover:bg-blue-800">
                                    <Link href={`/student/${student.id}`} className="">
                                        View Detail
                                    </Link>
                                </button>
                            </td>
                            <td className="w-[5rem] border border-gray-300 px-4 py-2">
                                <button
                                    className="px-[1rem] py-2 rounded btn-warning"
                                    onClick={() => handleOpenModal(student)}
                                >
                                    Edit
                                </button>
                            </td>
                            <td
                                className="w-[5rem] border border-gray-300 px-4 py-2"
                                onClick={() => handleDeleteStudent(student?.id)}
                            >
                                <button className="p-2 btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastNotification />
        </>
    );
}
