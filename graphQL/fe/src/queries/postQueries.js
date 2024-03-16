// src/queries/postQueries.js

import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      postId
      title
      content
      author {
        name,
        email,
        userId
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $authorId: String!) {
    createPost(title: $title, content: $content, authorId: $authorId) {
      title
      content
      authorId
    }
  }
`;

// 아래 쿼리 추가
export const GET_USER_POSTS = gql`
  query GetUserPosts($userId: String!) {
    user(userId: $userId) {
      userId
      name
      email
      posts {
        title
        content
        postId
      }
    }
  }
`;
