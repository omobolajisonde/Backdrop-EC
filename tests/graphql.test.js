const { graphql } = require("graphql");
require("dotenv").config();
const mongoose = require("mongoose");
const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = require("./../typeDefs");
const resolvers = require("./../resolvers");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

beforeAll(async () => {
  try {
    const TEST_DATABASE_URI =
      process.env.TEST_DATABASE_URI ||
      "mongodb://localhost:27017/Backdrop-test";
    await mongoose.connect(TEST_DATABASE_URI);
  } catch (error) {
    console.log("Error connecting to MongoDB Server.", error.message);
  }
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("GraphQL queries and mutations", () => {
  it('hello query should return "Welcome to Backdrop!"', async () => {
    const query = `
      query {
        hello
      }
    `;

    const result = await graphql(schema, query);
    expect(result.data.hello).toEqual("Welcome to Backdrop!");
  });

  it("addBankAccount mutation should return true", async () => {
    const mutation = `
      mutation($email: String!, $accountDetails: accountDetailsInput!) {
        addBankAccount(email: $email, accountDetails: $accountDetails)
      }
    `;

    const variables = {
      email: "omobolajisonde@gmail.com",
      accountDetails: {
        user_account_number: "2122766440",
        user_bank_code: "033",
        user_account_name: "Sonde Omobolaji Hameen",
      },
    };

    const result = await graphql(schema, mutation, null, null, variables);
    expect(result.data.addBankAccount).toEqual(true);
  });

  it("getAccountName query should return a string", async () => {
    const query = `
      query($bank_code: String!, $account_number: String!) {
        getAccountName(bank_code: $bank_code, account_number: $account_number)
      }
    `;

    const variables = {
      bank_code: "033",
      account_number: "2122766440",
    };

    const result = await graphql(schema, query, null, null, variables);
    expect(typeof result.data.getAccountName).toEqual("string");
  });
});
