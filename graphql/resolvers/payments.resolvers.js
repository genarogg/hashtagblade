import jwt from "jsonwebtoken";
import userModel from "../../models/user.model";
import subsModel from "../../models/subsucription.model";
import {
  generateSubscription,
  getSubscription,
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
    if (plan.status == "ACTIVE") {
      throw new Error("subscription active use update plan");
    }
    console.log(plan);
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
  }
};

export { createSubscription };
