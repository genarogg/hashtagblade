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

    //get User
    userModel
      .findById(token._id)
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: "Unauthorized" });
        } else {
          //get Subscription
          subscriptionModel
            .findOne({ clientId: user._id })
            .then((plan) => {
              if (!plan || plan.status !== "ACTIVE") {
                return res.status(401).json({ error: "Usuario sin plan" });
              }

              if (!req.body.hashtag || req.body.hashtag === "") {
                return res
                  .status(401)
                  .json({ error: "body hashtag indefinido" });
              }

              //get Hashtag
              InstaClient.getHashtag(req.body.hashtag).then((hashtag) => {
                res.status(200).json({ hashtag });
              });
            })
            .catch((e) => {
              return res.status(401).json({ error: "Usuario sin plan" });
            });
        }
      })
      .catch((e) => {
        return res.status(401).json({ error: "Unauthorized" });
      });
  } else {
    res.status(404).send("Not Found");
  }
}
