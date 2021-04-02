import { register, login, getMyUser } from "./user.resolvers";

const resolvers = {
  Query: {
    hello: () => "Hello World",
    getMyUser,
  },
  Mutation: {
    register,
    login,
  },
};

export default resolvers;
