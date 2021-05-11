import userModel from "../../../models/user.model";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const input = req.body;

    if (!input.email || !input.password) {
      return res.status(400).json({ error: "Complete all values" });
    }

    for (let i in input) {
      if (input[i] === "" || input[i].length < 3) {
        return res.status(400).json({ error: "Complete all values" });
      }
    }

    //Email Validation
    if (!input.email.includes("@") || !input.email.includes("mail.com")) {
      return res.status(400).json({ error: "Type a correct email" });
    }

    //Verify if account exist
    userModel.findOne({ email: input.email }, (error, user) => {
      if (error) {
        return res.status(500).json({ error: "Internal Error" });
      }

      if (!user) {
        return res.status(400).json({ error: "User doesn't exist" });
      }

      if (!user.password) {
        return res
          .status(400)
          .json({ error: "This account doesn't have password" });
      }

      //Verify if the password is equal and send token
      user.compare(input.password, (err, equal) => {
        if (err) {
          return res.status(500).json({ error: "Internal Error" });
        }

        if (equal) {
          const token = jwt.sign({ _id: input._id }, process.env.TOKENKEY);
          res.status(200).json({ token });
        } else {
          res.status(400).json({ error: "Contrasena Invalidada" });
        }
      });
    });
  } else {
    res.status(404).send("Not found");
  }
}
