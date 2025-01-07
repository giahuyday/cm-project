import { gql } from "@apollo/client";

export const GET_COURSES = gql`
    query {
        getCourses {
            id
            name
        }
    }
`;

export const GET_COURSE = gql`
    query ($id: Int!) {
        getCourseById(id: $id) {
            id
            name
        }
    }
`;

export const GET_COURSE_BY_NAME = gql`
    query ($name: String!) {
        getCourseByName(courseDto: { name: $name }) {
            id
            name
        }
    }
`;
