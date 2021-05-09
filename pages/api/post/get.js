import Intsa from "scraper-instagram";
import extractToken from "../../../functions/extractToken";
import subscriptionModel from "../../../models/subscription.model";
import userModel from "../../../models/user.model";

const InstaClient = new Intsa();

//This need a post short code to run this function
export default async function handler(req, res) {
  if (req.method === "POST") {
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

    if (req.body.post === "" || !req.body.post) {
      res.status(400).json({ error: "body 'post' invalid" });
    }

    InstaClient.getPost(req.body.post).then((data) => {
      res.status(200).json({ data });
    });
  } else {
    res.status(400).send("Not Found");
  }
}
