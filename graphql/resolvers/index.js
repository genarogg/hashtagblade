import {
  register,
  login,
  getMyUser,
  passwordRequest,
  updatePassword,
  updateProfile,
} from "./user.resolvers";

import { verifySocial, registerWithSocial } from "./social.resolvers";

import { createSubscription } from "./payments.resolvers";

const resolvers = {
  Query: {
    getMyUser,
    passwordRequest,
    verifySocial,
    createSubscription,
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
