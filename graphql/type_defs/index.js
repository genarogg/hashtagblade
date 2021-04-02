import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    hello: String!
    getMyUser(token: String!): User!
  }

  type Mutation {
    register(input: registerInput!): String!
    login(input: loginInput!): String!
  }

  type User {
    _id: ID!
    email: String!
    first_name: String!
    last_name: String!
    country: String!
    birthdate: String!
    gender: String!
  }

  input registerInput {
    email: String!
    password: String!
    first_name: String!
    last_name: String!
    country: String!
    birthdate: String!
    gender: String!
  }

  input loginInput {
    email: String!
    password: String!
  }
`;

export default typeDefs;
