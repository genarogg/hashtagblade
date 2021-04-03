import {
  register,
  login,
  getMyUser,
  passwordRequest,
  updatePassword,
  updateProfile,
} from "./user.resolvers";

import { verifySocial, registerWithSocial } from "./social.resolvers";

const resolvers = {
  Query: {
    getMyUser,
    passwordRequest,
    verifySocial,
  },
  Mutation: {
    register,
    login,
    registerWithSocial,
    updatePassword,
    updateProfile,
  },
};

export default resolvers;
