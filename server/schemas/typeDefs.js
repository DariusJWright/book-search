// import gql
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID!
    bookId: Int
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  
  type User {
    _id: ID!
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  
  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookId: Int!, authors: [String!], description: String!, title: String!, image: String!, link: String!): User
    removeBook(bookId: Int!): User
  }

  type Auth {
    token: ID!
    user: User
  }
  `;

module.exports = typeDefs;


// input saveBookInput {
//   _id: ID!
//   bookId: Int!
//   authors: [String!]
//   description: String!
//   title: String!
//   image: String!
//   link: String!
// }