import {
  register,
  login,
  getMyUser,
  passwordRequest,
  updatePassword,
  updateProfile,
} from "./user.resolvers";

import { verifySocial, registerWithSocial } from "./social.resolvers";

import { create_subscription } from "./payments.resolvers";

const resolvers = {
  Query: {
    getMyUser,
    passwordRequest,
    verifySocial,
    create_subscription,
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
