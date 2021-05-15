import jwt from "jsonwebtoken";
import userModel from "../../../models/user.model";
import sendMail from "../../../functions/sendMail";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, uri } = req.body;
    //Check if email body exist
    if (email === "" || !email.includes("@") || !email.includes("mail.com")) {
      res.satus(400).json({ error: "Type a correct email" });
    }

    //Check if email exist
    const emailExist = await userModel.findOne({ email });
    if (!emailExist) {
      throw new Error("Email no existe");
    }

    //Create token whit 1h of expiration
    const token = jwt.sign(
      {
        action_type: "reset password",
        _id: emailExist._id,
      },
      process.env.TOKENKEY,
      { expiresIn: "1h" }
    );

    //Send Mail
    const send = await sendMail(
      "Reset Password",
      `
          <h2>Ahora vas a reestablecer tu contraseña</h2>
          <br/>
          <p>dale click al link expira en una hora</p>
          <br/>
          <a href="${uri}/nueva-contrasena?token=${token}">Link</a>
      `,
      email
    );

    //Check if mail is send
    if (send) {
      return res.status(200).json({ message: "Mail enviado" });
    } else {
      return res.status(400).json({ error: "Mail No enviado" });
    }
  } else {
    res.status(404).send("Not found");
  }
}
