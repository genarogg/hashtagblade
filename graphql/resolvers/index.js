import {
  register,
  login,
  getMyUser,
  passwordRequest,
  updatePassword,
  updateProfile,
} from "./user.resolvers";

const resolvers = {
  Query: {
    getMyUser,
    passwordRequest,
  },
  Mutation: {
    register,
    login,
    updatePassword,
    updateProfile,
  },
};

export default resolvers;
