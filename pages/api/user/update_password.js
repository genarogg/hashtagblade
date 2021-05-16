import jwt from "jsonwebtoken";
import userModel from "../../../models/user.model";
import encryptNewPassword from "../../../functions/encryptNewPassword";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { token, password } = req.body;

    if (password === "" || password.length < 8) {
      return res.status(400).json({ error: "Type a better password" });
    }
    //Token
    let tokenContent;

    try {
      //Verify token
      tokenContent = await jwt.verify(token, process.env.TOKENKEY);
    } catch (error) {
      return res.status(400).json({ error: "Invalid token" });
    }

    //Verify action type
    if (tokenContent.action_type !== "reset password") {
      return res.status(400).json({ error: "Invalid action_type" });
    }

    //Check if email exist
    const userExist = await userModel.findById(tokenContent._id);
    if (!userExist) {
      return res.status(404).json({ error: "User Doesn't Exist" });
    }

    //hash the password
    const hashPassword = await encryptNewPassword(password);

    //Update password
    const updatePassword = await userModel.findByIdAndUpdate(tokenContent._id, {
      password: hashPassword,
    });

    res.status(200).json({ message: "Done" });
  } else {
    res.status(404).send("not found");
  }
}
