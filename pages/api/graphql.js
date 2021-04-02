import { ApolloServer } from "apollo-server-micro";
import { connectDB } from "../../database/db";

import typeDefs from "../../graphql/type_defs/index";
import resolvers from "../../graphql/resolvers/index";

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
