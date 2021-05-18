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
    if (!mySub) {
      return res.status(400).json({ error: "Subscription isn't exist" });
    }

    switch (req.body.type) {
      case "basic":
        const update_basic = await getUpdateSubscription(
          mySub.paypalId,
          process.env.PLANBASIC,
          auth
        );

        return res
          .status(200)
          .json({
            link: update_basic.links.find((v) => v.rel === "approve").href,
          });
        break;
      case "medio":
        const update_medio = await getUpdateSubscription(
          mySub.paypalId,
          process.env.PLANMEDIO,
          auth
        );

        return res
          .status(200)
          .json({
            link: update_medio.links.find((v) => v.rel === "approve").href,
          });
        break;

      case "advanced":
        const update_advanced = await getUpdateSubscription(
          mySub.paypalId,
          process.env.PLANADVANCED,
          auth
        );

        return res
          .status(200)
          .json({
            link: update_advanced.links.find((v) => v.rel === "approve").href,
          });
        break;

      default:
        return res.status(400).json({ error: "Body 'type' isn't exist" });
    }
  } else {
    res.status(404).send("not found");
  }
}
