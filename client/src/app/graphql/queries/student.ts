import { gql } from "@apollo/client";

export const GET_STUDENTS = gql`
    query {
        getStudents {
            id
            name
            classId {
                id
                name
            }
        }
    }
`;

export const GET_STUDENT = gql`
    query ($id: Float!) {
        getStudentById(studenDto: { id: $id }) {
            id
            name
            classId {
                id

                name
                __typename
            }
        }
    }
`;

export const GET_STUDENTS_BY_NAME = gql`
    query ($searchQuery: String) {
        getStudentByName(studentDto: { name: $searchQuery }) {
            id
            name
            classId {
                id
                name
            }
        }
    }
`;

export const GET_STUDENTS_BY_CLASSNAME = gql`
    query ($searchQuery: String) {
        getStudentByClassName(studentDto: { courseName: $searchQuery }) {
            id
            name
            classId {
                id
                name
            }
        }
    }
`;
