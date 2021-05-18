import jwt from "jsonwebtoken";
import userModel from "../../../models/user.model";
import subsModel from "../../../models/subscription.model";
import {
  generateSubscription,
  getSubscription,
  getUpdateSubscription,
} from "../../../functions/subscriptionfunctions";
import extractToken from "../../../functions/extractToken";

const auth = {
  user: process.env.PAYPALID,
  pass: process.env.PAYPALSECRET,
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const token = await extractToken(req);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const myUser = await userModel.findById(token._id);
    if (!myUser) {
      return res.status(401).json({ error: "User doesn't exist" });
    }

    const mySub = await subsModel.findOne({ clientId: myUser._id });

    //verify Subscription user (if has)
    if (mySub) {
      const plan = await getSubscription(mySub.paypalId, auth);
      if (plan.status === "ACTIVE") {
        return res
          .status(200)
          .json({ error: "subscription active use update plan" });
      }
      if (
        plan.name !== "RESOURCE_NOT_FOUND" &&
        plan.status !== "CANCELLED" &&
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
        return res
          .status(200)
          .json({ link: plan.links.find((v) => v.rel === "approve").href });
      }
    }

    if (!req.body.type || req.body.type === "") {
      return res.status(400).json({ error: "Body 'type' isn't defined" });
    }

    //Choose plan type
    switch (req.body.type) {
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

        return res
          .status(200)
          .json({ link: plan.links.find((v) => v.rel === "approve").href });
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

        return res.status(200).json({
          link: plan_medio.links.find((v) => v.rel === "approve").href,
        });
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

        return res.status(200).json({
          link: plan_advanced.links.find((v) => v.rel === "approve").href,
        });
        break;

      default:
        return res.status(400).json({ error: "Invalid type" });
    }
  } else {
    res.status(404).send("not found");
  }
}
