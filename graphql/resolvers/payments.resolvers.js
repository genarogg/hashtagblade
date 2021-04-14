import jwt from "jsonwebtoken";
import userModel from "../../models/user.model";
import subsModel from "../../models/subsucription.model";
import {
  generateSubscription,
  getSubscription,
  getUpdateSubscription,
} from "../../functions/subscriptionfunctions";

const auth = {
  user: process.env.PAYPALID,
  pass: process.env.PAYPALSECRET,
};

const createSubscription = async (_root, { token, type }) => {
  if (type === "" || token === "") {
    throw new Error("Incorrect values");
  }

  let decode;
  try {
    decode = await jwt.verify(token, process.env.TOKENKEY);
  } catch {
    throw new Error("Invalid token");
  }

  const myUser = await userModel.findById(decode._id);
  if (!myUser) {
    throw new Error("User doesn't exist");
  }

  const mySub = await subsModel.findOne({ clientId: myUser._id });
  console.log(mySub);

  if (mySub) {
    const plan = await getSubscription(mySub.paypalId, auth);
    if (plan.status === "ACTIVE") {
      throw new Error("subscription active use update plan");
    }
    if (
      plan.name != "RESOURCE_NOT_FOUND" &&
      ((plan.plan_id === process.env.PLANBASIC &&
        type === "basic" &&
        !myUser.plan) ||
        (plan.plan_id === process.env.PLANMEDIO &&
          type === "medio" &&
          !myUser.plan) ||
        (plan.plan_id === process.env.PLANADVANCED &&
          type === "advanced" &&
          !myUser.plan))
    ) {
      console.log("ok2");
      return plan.links.find((v) => v.rel === "approve").href;
    }
  }

  //Choose plan type
  switch (type) {
    case "basic":
      const plan = await generateSubscription(
        myUser,
        process.env.PLANBASIC,
        auth
      );

      console.log(plan);
      console.log("Hola");

      if (!mySub) {
        await new subsModel({
          paypalId: plan.id,
          clientId: myUser._id,
          status: plan.status,
          type: "basic",
        }).save();
      } else {
        await subsModel.findByIdAndUpdate(mySub._id, {
          paypalId: plan.id,
          type: "basic",
        });
      }

      console.log("ok");

      return plan.links.find((v) => v.rel === "approve").href;
      break;
    case "medio":
      const plan_medio = await generateSubscription(
        myUser,
        process.env.PLANMEDIO,
        auth
      );

      if (!mySub) {
        await new subsModel({
          paypalId: plan_medio.id,
          clientId: myUser._id,
          status: plan_medio.status,
          type: "medio",
        }).save();
      } else {
        await subsModel.findByIdAndUpdate(mySub._id, {
          paypalId: plan_medio.id,
          type: "medio",
        });
      }

      return plan_medio.links.find((v) => v.rel === "approve").href;
      break;
    case "advanced":
      const plan_advanced = await generateSubscription(
        myUser,
        process.env.PLANADVANCED,
        auth
      );

      if (!mySub) {
        await new subsModel({
          paypalId: plan_advanced.id,
          clientId: myUser._id,
          status: plan_advanced.status,
          type: "advanced",
        }).save();
      } else {
        await subsModel.findByIdAndUpdate(mySub._id, {
          paypalId: plan_advanced.id,
          type: "advanced",
        });
      }

      return plan_advanced.links.find((v) => v.rel === "approve").href;
      break;

    default:
      throw new Error("Invalid types");
  }
};

const updateSubscription = async (_root, { token, type }) => {
  if (token === "" || type === "") {
    throw new Error("Invalid Values");
  }

  let decode;
  try {
    decode = await jwt.verify(token, process.env.TOKENKEY);
  } catch {
    throw new Error("Invalud Token");
  }

  const myUser = await userModel.findById(decode._id);
  if (!myUser) {
    throw new Error("Unauthorized");
  }

  const mySub = await subsModel.findOne({ clientId: myUser._id });
  if (!mySub) {
    throw new Error("Subscription not added to this account");
  }

  switch (type) {
    case "basic":
      const update_basic = await getUpdateSubscription(
        mySub.paypalId,
        process.env.PLANBASIC,
        auth
      );

      return update_basic.links.find((v) => v.rel === "approve").href;
      break;
    case "medio":
      const update_medio = await getUpdateSubscription(
        mySub.paypalId,
        process.env.PLANMEDIO,
        auth
      );

      return update_medio.links.find((v) => v.rel === "approve").href;
      break;

    case "advanced":
      const update_advanced = await getUpdateSubscription(
        mySub.paypalId,
        process.env.PLANADVANCED,
        auth
      );

      return update_advanced.links.find((v) => v.rel === "approve").href;
      break;

    default:
      throw new Error("Invalid type");
  }
};

export { createSubscription, updateSubscription };
