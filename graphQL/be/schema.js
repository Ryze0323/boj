const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    userId: String!,
    name: String!,
    email: String!
  }

  type Post {
    postId: String!,
    title: String!,
    content: String!,
    author: User,
  }

  type Query {
    user(userId: String!): User
    users: [User]
    post(postId: String!): Post
    posts: [Post]
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    createPost(title: String!, content: String!, authorId: String!): Post
  }
`;

module.exports = typeDefs;
