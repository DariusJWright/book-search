// import gql
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    bookId: Int
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  
  type User {
    _id: ID
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
    saveBook(book: saveBookInput): User
    removeBook(bookId: Int!): User
  }

  input saveBookInput {
    authors: [String!]
    description: [String]
    title: [String]
    bookId: Int!
    image: String!
    link: String!
  }

  type Auth {
    token: ID!
    user: User
  }
  `;

module.exports = typeDefs;