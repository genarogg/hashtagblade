import extractToken from "../../../functions/extractToken";
import userModel from "../../../models/user.model";
import Intsa from "scraper-instagram";
import subscriptionModel from "../../../models/subscription.model";
import hashtagsModel from "../../../models/hashtags.model";

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
          .then(async (plan) => {
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

            if (req.body.hashtags.length > 30) {
              return res.status(400).json({ error: "Maximo 5 hashtags" });
            }

            //verify if collection exist
            const existCollection = await hashtagsModel.findOne({
              clientId: user._id,
            });
            if (existCollection) {
              return res
                .status(400)
                .json({
                  error: "Existe collecion, mejor actualiza la coleccion",
                });
            }

            const hashtagCollection = new hashtagsModel({
              clientId: user._id,
              hashtags: req.body.hashtags,
            });

            hashtagCollection.save((error, save) => {
              if (error) {
                return res.status(500).json({ error: "Internal Error" });
              }

              res.status(201).json({ data: "Done" });
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
