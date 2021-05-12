import extractToken from "../../../functions/extractToken";
import userModel from "../../../models/user.model";
import Intsa from "scraper-instagram";
import subscriptionModel from "../../../models/subscription.model";
import hashtagsModel from "../../../models/hashtags.model";

const InstaClient = new Intsa();

export default async function handler(req, res) {
  /* IF METHOD IS POST CREATES THE COLLECTION*/
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
              !req.body.hashtags.every((v) => typeof v === "string") ||
              !req.body.name ||
              req.body.name === ""
            ) {
              return res.status(400).json({ error: "Argumentos incorrectos" });
            }

            if (req.body.hashtags.length > 30) {
              return res.status(400).json({ error: "Maximo 30 hashtags" });
            }

            //verify if collection exist
            const existCollection = await hashtagsModel.findOne({
              clientId: user._id,
              name: req.body.name,
            });
            if (existCollection) {
              return res.status(400).json({
                error: "Existe collecion, mejor actualiza la coleccion",
              });
            }

            const hashtagCollection = new hashtagsModel({
              clientId: user._id,
              name: req.body.name,
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

    /* IF METHOD IS PATCH UPDATES THE COLLECTION */
  } else if (req.method === "PATCH") {
    const token = await extractToken(req);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    //getModel
    userModel
      .findById(token._id)
      .then((user) => {
        console.log(token);
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
              !req.body.hashtag ||
              !typeof req.body.hashtag === "string" ||
              !req.body.name ||
              req.body.name === ""
            ) {
              return res
                .status(400)
                .json({ error: "Body hashtag doesn't exist" });
            }

            //verify if collection exist
            const collection = await hashtagsModel.findOne({
              clientId: user._id,
              name: req.body.name,
            });

            if (!collection) {
              return res.status(400).json({
                error: "Coleccion inexistente",
              });
            }

            const holdvalue = [...collection.hashtags, req.body.hashtag];

            if (holdvalue.length > 30) {
              return res.status(400).json({ error: "Maximo 30 hashtags" });
            }

            hashtagsModel.findByIdAndUpdate(
              collection._id,
              { hashtags: holdvalue },
              (err, doc) => {
                if (err) {
                  return res.status(500).json({ error: "Internal Error" });
                }

                res.status(200).json({ message: "Done" });
              }
            );
          })
          .catch((e) => {
            res.status(401).json({ error: "Usuario sin plan" });
          });
      })
      .catch((e) => {
        console.log(e);
        res.status(401).json({ error: "Unauthorized" });
      });

    /* IF METHOD IS PUT DELETE A ITEM THE COLLECTION */
  } else if (req.method === "PUT") {
    const token = await extractToken(req);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    //getModel
    userModel
      .findById(token._id)
      .then((user) => {
        console.log(token);
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
              !req.body.hashtag ||
              !typeof req.body.hashtag === "string" ||
              req.body.name === "" ||
              !req.body.name
            ) {
              return res
                .status(400)
                .json({ error: "Body hashtag doesn't exist" });
            }

            //verify if collection exist
            const collection = await hashtagsModel.findOne({
              clientId: user._id,
              name: req.body.name,
            });

            if (!collection) {
              return res.status(400).json({
                error: "Coleccion inexistente",
              });
            }

            const holdvalue = collection.hashtags;
            const index = holdvalue.findIndex((v) => v === req.body.hashtag);
            if (index === -1) {
              return res
                .status(404)
                .json({ error: "Este hashtag no existe en esta coleccion" });
            }

            holdvalue.splice(index, 1);

            hashtagsModel.findByIdAndUpdate(
              collection._id,
              { hashtags: holdvalue },
              (err, doc) => {
                if (err) {
                  return res.status(500).json({ error: "Internal Error" });
                }

                res.status(200).json({ message: "Done" });
              }
            );
          })
          .catch((e) => {
            res.status(401).json({ error: "Usuario sin plan" });
          });
      })
      .catch((e) => {
        console.log(e);
        res.status(401).json({ error: "Unauthorized" });
      });
  } else if (req.method === "DELETE") {
    const token = await extractToken(req);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    //getModel
    userModel
      .findById(token._id)
      .then((user) => {
        console.log(token);
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

            if (req.body.name === "" || !req.body.name) {
              return res
                .status(400)
                .json({ error: "Body hashtag doesn't exist" });
            }

            //verify if collection exist
            const collection = await hashtagsModel.findOne({
              clientId: user._id,
              name: req.body.name,
            });

            if (!collection) {
              return res.status(400).json({
                error: "Coleccion inexistente",
              });
            }

            hashtagsModel.findByIdAndDelete(collection._id, (err, doc) => {
              if (err) {
                return res.status(500).json({ error: "Internal Error" });
              }

              res.status(200).json({ message: "Done" });
            });
          })
          .catch((e) => {
            res.status(401).json({ error: "Usuario sin plan" });
          });
      })
      .catch((e) => {
        console.log(e);
        res.status(401).json({ error: "Unauthorized" });
      });
  } else {
    res.status(404).send("not found");
  }
}
