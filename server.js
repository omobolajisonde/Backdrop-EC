const express = require("express");
require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const connectToMongoDB = require("./db");

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";

(async () => {
  try {
    const app = express();
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      persistedQueries: false,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: "/graphql" });
    await connectToMongoDB();
    // Root Route
    app.get("/", (req, res, next) => {
      res
        .status(200)
        .json({
          status: "success",
          message:
            "Welcome to Backdrop 🖼. Go to /graphql to access the GraphQL API.",
        });
    });
    app.listen(PORT, HOST, () => {
      console.log(`❄ Server started on port, ${PORT}.`);
    });
  } catch (error) {
    console.log("🤦‍♂️ Oops something went terribly wrong.", error);
  }
})();
