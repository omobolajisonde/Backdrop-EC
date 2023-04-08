const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language

const typeDefs = gql`
  input accountDetailsInput {
    user_account_number: ID!
    user_bank_code: String!
    user_account_name: String!
  }

  type Query {
    hello: String!
    getAccountName(bank_code: String!, account_number: String!): String
  }

  type Mutation {
    addBankAccount(email: String!, accountDetails: accountDetailsInput): Boolean
  }
`;

module.exports = typeDefs;
