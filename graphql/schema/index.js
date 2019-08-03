const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Book {
    _id: ID!
    title: String!
    author: String!
    description: String!
    pages: Int!
    isbn: Int!
    creator: User!
  }

  type User {
    _id: ID!
    email: String!
    password: String
    createdBooks: [Book!]
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  input BookInput {
    title: String!
    author: String!
    description: String!
    pages: Int!
    isbn: Int!
  }

  input UserInput {
    email: String!
    password: String!
  }

  type RootQuery {
    books: [Book!]!
    login(email: String!, password: String!): AuthData!
  }

  type RootMutation {
    createBook(bookInput: BookInput): Book
    createUser(userInput: UserInput): User
    deleteBook(bookId: ID!): Book
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
