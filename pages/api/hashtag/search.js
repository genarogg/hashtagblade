import Intsa from "scraper-instagram";
import extractToken from "../../../functions/extractToken";
import subscriptionModel from "../../../models/subscription.model";
import userModel from "../../../models/user.model";

const InstaClient = new Intsa();

export default async function (req, res) {
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

    if (req.body.search === "" || !req.body.search) {
      res.status(400).json({ error: "body 'search' invalid" });
    }
    InstaClient.searchHashtag(req.body.search).then((data) =>
      res.status(200).json({ data })
    );
  } else {
    res.status(404).send("not found");
  }
}
