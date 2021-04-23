import {
  register,
  login,
  getMyUser,
  passwordRequest,
  updatePassword,
  updateProfile,
} from "./user.resolvers";

import { verifySocial, registerWithSocial } from "./social.resolvers";

import { createSubscription, updateSubscription } from "./payments.resolvers";

const resolvers = {
  Query: {
    getMyUser,
    passwordRequest,
    verifySocial,
    createSubscription,
    updateSubscription,
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
