// src/queries/userQueries.js

import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      userId
      name
      email
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      name
      email
    }
  }
`;

// 아래 쿼리 추가
export const GET_USER = gql`
  query GetUser($userId: String!) {
    user(userId: $userId) {
      userId
      name
      email
    }
  }
`;
