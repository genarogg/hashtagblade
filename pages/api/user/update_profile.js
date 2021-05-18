import userModel from "../../../models/user.model";
import extractToken from "../../../functions/extractToken";
import encryptNewPassword from "../../../functions/encryptNewPassword";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const token = await extractToken(req);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const myUser = await userModel.findById(token._id);
    if (!myUser) {
      return res.status(401).json({ error: "User doesn't exist" });
    }

    let querys = {};

    for (let i in req.body) {
      if (input[i] && input[i] !== "" && i === "password") {
        if (input[i].length < 8) {
          return res.status(400).json({ error: "Type a better password" });
        }
        querys[i] = await encryptNewPassword(input[i]);
      } else if (input[i] && input[i] !== "" && i !== "email") {
        querys[i] = input[i];
      }
    }

    const update = await userModel.findByIdAndUpdate(myToken._id, querys, {
      new: true,
    });

    res.status(200).json({ ...update._doc, password: null });
  } else {
    res.status(404).send("not found");
  }
}
