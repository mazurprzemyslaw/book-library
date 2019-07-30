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
  }

  type RootMutation {
    createBook(bookInput: BookInput): Book
    createUser(userInput: UserInput): User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
