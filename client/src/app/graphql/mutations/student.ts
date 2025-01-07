import { gql } from "@apollo/client";

export const DELETE_STUDENT = gql`
    mutation ($id: Float!) {
        deleteStudent(studentDto: { id: $id })
    }
`;

export const CREATE_STUDENT = gql`
    mutation ($name: String!, $classId: Float!) {
        createStudent(studentDto: { name: $name, classId: $classId }) {
            id
            name
        }
    }
`;

export const UPDATE_STUDENT = gql`
    mutation ($id: Float!, $name: String!, $classId: Float!) {
        updateStudent(studentDto: { id: $id, name: $name, classId: $classId }) {
            id
            name
            __typename
            classId {
                id
                name
            }
        }
    }
`;
