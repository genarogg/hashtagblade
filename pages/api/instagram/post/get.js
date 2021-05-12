import userInstagram from "user-instagram";
import extractToken from "../../../../functions/extractToken";
import subscriptionModel from "../../../../models/subscription.model";
import userModel from "../../../../models/user.model";

export default async function handler(req, res) {
  if (req.method === "POST") {
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

              if (!req.body.post || req.body.post === "") {
                return res.status(401).json({ error: "body post indefinido" });
              }

              //get Post by shortcode
              userInstagram
                .getPostData(req.body.post)
                .then((post) => {
                  res.status(200).json({ post });
                })
                .catch((e) => {
                  res.status(404).json({ error: "post not found" });
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
