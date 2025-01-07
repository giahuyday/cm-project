import { gql } from "@apollo/client";

export const CREATE_COURSE = gql`
    mutation ($name: String!) {
        createCourse(courseDto: { name: $name }) {
            id
            name
        }
    }
`;

export const UPDATE_COURSE = gql`
    mutation ($id: Float!, $name: String!) {
        updateCourseById(id: $id, courseDto: { name: $name }) {
            id
            name
        }
    }
`;

export const DELETE_COURSE = gql`
    mutation ($id: Float!) {
        deleteCourseById(courseDto: { id: $id })
    }
`;
