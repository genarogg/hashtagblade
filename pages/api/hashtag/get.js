import Intsa from "scraper-instagram";
import extractToken from "../../../functions/extractToken";
import subscriptionModel from "../../../models/subscription.model";
import userModel from "../../../models/user.model";

const InstaClient = new Intsa();

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.body.hashtag === "" || !req.body.hashtag) {
      return res.status(400).json({ error: "body 'hashtag' invalid" });
    }

    const token = await extractToken(req);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const User = await userModel.findById(token._id);
    if (!User) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const plan = await subscriptionModel.findOne({ client: User._id });
    if (!plan || plan.status !== "ACTIVE") {
      return res.status(401).json({ error: "Usuario sin plan" });
    }

    console.time("hello");
    InstaClient.getHashtag(req.body.hashtag).then((data) => {
      console.timeEnd("hello");

      res.status(200).json({ data });
    });
  } else {
    res.status(404).send("Not Found");
  }
}
