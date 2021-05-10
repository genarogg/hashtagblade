import extractToken from "../../../functions/extractToken";
import userModel from "../../../models/user.model";
import Intsa from "scraper-instagram";
import subscriptionModel from "../../../models/subscription.model";

const InstaClient = new Intsa();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const token = await extractToken(req);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    //getModel
    userModel
      .findById(token._id)
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        //get Subscription
        subscriptionModel
          .findOne({ clientId: user._id })
          .then((plan) => {
            if (!plan || plan.status !== "ACTIVE") {
              return res.status(401).json({ error: "Usuario sin plan" });
            }

            if (
              !req.body.hashtags ||
              !Array.isArray(req.body.hashtags) ||
              !req.body.hashtags.every((v) => typeof v === "string")
            ) {
              return res.status(400).json({ error: "Argumentos incorrectos" });
            }

            if (req.body.hashtags.length > 5) {
              return res.status(400).json({ error: "Maximo 5 hashtags" });
            }

            //get Hashtag
            Promise.all(
              req.body.hashtags.map((v) => InstaClient.getHashtag(v))
            ).then((data) => {
              return res.status(200).json({ data });
            });
          })
          .catch((e) => {
            res.status(401).json({ error: "Usuario sin plan" });
          });
      })
      .catch((e) => {
        res.status(401).json({ error: "Unauthorized" });
      });
  } else {
    res.status(404).send("not found");
  }
}
