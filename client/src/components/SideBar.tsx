"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Sidebar() {
    const [openClass, setOpenClass] = useState(false);
    const [openStudent, setOpenStudent] = useState(false);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1>Sidebar</h1>
                <FontAwesomeIcon icon={faBars} className="fa-fw" />
            </div>
            <ul className="grid gird-rows-1 gap-4">
                {/* Lớp học */}
                <li>
                    <button
                        onClick={() => setOpenClass(!openClass)}
                        className="flex items-center justify-between w-full"
                    >
                        <span>Classes</span>
                        <div className="">
                            {openClass ? (
                                <FontAwesomeIcon icon={faChevronDown} className="fa-fw" />
                            ) : (
                                <FontAwesomeIcon icon={faChevronRight} className="fa-fw" />
                            )}
                        </div>
                    </button>
                    {openClass && (
                        <ul className="grid gap-1 mt-1 ml-4 p-2">
                            <li className="hover:bg-blue-900 w-full p-2">
                                <Link href="/class/create">+ Create class</Link>
                            </li>
                            <li className="hover:bg-blue-900 w-full p-2">
                                <Link href="/class">+ View class list</Link>
                            </li>
                            <li className="hover:bg-blue-900 w-full p-2">
                                <Link href="#">+ Update class</Link>
                            </li>
                            <li className="hover:bg-blue-900 w-full p-2">
                                <Link href="#">+ Delete class</Link>
                            </li>
                        </ul>
                    )}
                </li>

                <li>
                    <button
                        onClick={() => setOpenStudent(!openStudent)}
                        className="flex items-center justify-between w-full"
                    >
                        <span>Student </span>
                        <div>
                            {openStudent ? (
                                <FontAwesomeIcon icon={faChevronDown} className="fa-fw" />
                            ) : (
                                <FontAwesomeIcon icon={faChevronRight} className="fa-fw" />
                            )}
                        </div>
                    </button>
                    {openStudent && (
                        <ul className="grid gap-1 mt-1 ml-4">
                            <li className="hover:bg-blue-900 w-full p-2">
                                <Link href="/student/create">+ Create student</Link>
                            </li>
                            <li className="hover:bg-blue-900 w-full p-2">
                                <Link href="/student">+ View student list</Link>
                            </li>
                            <li className="hover:bg-blue-900 w-full p-2">
                                <Link href="#">+ Update student</Link>
                            </li>
                            <li className="hover:bg-blue-900 w-full p-2">
                                <Link href="#">+ Delete student</Link>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
}
