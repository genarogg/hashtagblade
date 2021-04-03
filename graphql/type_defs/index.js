import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    getMyUser(token: String!): User!
    passwordRequest(input: inputPasswordRequest!): String!
  }

  type Mutation {
    register(input: registerInput!): String!
    login(input: loginInput!): String!
    updatePassword(input: newPassword!): String!
    updateProfile(input: profile): User!
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

  input profile {
    token: String!
    email: String
    password: String
    first_name: String
    last_name: String
    country: String
    birthdate: String
    gender: String
  }

  input newPassword {
    token: String!
    password: String!
  }

  input inputPasswordRequest {
    email: String!
    uri: String!
  }

  input loginInput {
    email: String!
    password: String!
  }
`;

export default typeDefs;
