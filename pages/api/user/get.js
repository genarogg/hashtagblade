import extractToken from "../../../functions/extractToken";
import userModel from "../../../models/user.model";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const token = await extractToken(req);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    userModel
      .findOne({ _id: token._id })
      .then((data) => {
        if (!data) {
          res.status(404).json({ error: "User not found" });
        } else {
          res.status(200).json({ ...data._doc, password: null });
        }
      })
      .catch((e) => {
        res.status(500).json({ error: "Internal Error" });
      });
  } else {
    res.status(404).send("Not Found");
  }
}
