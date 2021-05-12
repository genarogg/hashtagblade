import userModel from "../../../models/user.model";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const input = req.body;

    if (
      !input.first_name ||
      !input.last_name ||
      !input.email ||
      !input.country ||
      !input.gender ||
      !input.birthdate ||
      !input.password
    ) {
      return res.status(400).json({ error: "Completa todos los valores" });
    }

    for (let i in input) {
      if (input[i] === "" || input[i].length < 3) {
        return res.status(400).json({ error: "Completa todos los valores" });
      }
    }

    //Email Validation

    if (!input.email.includes("@") || !input.email.includes("mail.com")) {
      return res.status(400).json({ error: "Type a correct email" });
    }

    //Password Validation

    if (input.password.length < 8) {
      return res
        .status(400)
        .json({ error: "Type a password with 8 characters" });
    }

    //Birthdate Validation

    if (input.birthdate.match(/-/gi).length !== 2) {
      return res.status(400).json({ error: "Año de nacimiento invalido" });
    }

    //convert birthdate to array to verify
    const birthdate_array = input.birthdate.split("-");
    birthdate_array.forEach((v) => {
      if (isNaN(v)) {
        return res.status(400).json({ error: "Año de nacimiento invalido" });
      }
    });

    //verify Year
    if (Number(birthdate_array[0]) > new Date().getFullYear()) {
      return res.status(400).json({ error: "Año de nacimiento invalido" });
    }

    //verify if the birthdate have the 3 numbers
    if (birthdate_array.length < 3) {
      return res.status(400).json({ error: "Año de nacimiento invalido" });
    }

    //verify february day 29
    if (Number(birthdate_array[1]) === 2) {
      if (Number(birthdate_array[2]) > 29) {
        return res.status(400).json({ error: "Año de nacimiento invalido" });
      }
    }

    //verify months days
    if (Number(birthdate_array[2]) > 31) {
      return res.status(400).json({ error: "Año de nacimiento invalido" });
    }

    //verify months
    if (Number(birthdate_array[1]) > 12) {
      return res.status(400).json({ error: "Año de nacimiento invalido" });
    }

    //Verify Email in other account
    userModel
      .findOne({ email: input.email })
      .then((exist) => {
        if (exist) {
          return res
            .status(400)
            .json({ error: "Email exist with other account" });
        }
        //Save User and get token
        const newUser = new userModel({ ...input });
        newUser.save((error, save) => {
          if (error) {
            return res.status(500).json({ error: "Internal Error" });
          }

          const token = jwt.sign({ _id: save._id }, process.env.TOKENKEY);

          res.status(200).json({ token });
        });
      })
      .catch((e) => {
        //Save User and get token
        const newUser = new userModel({ ...input });
        newUser.save((error, save) => {
          if (error) {
            return res.status(500).json({ error: "Internal Error" });
          }

          const token = jwt.sign({ _id: save._id }, process.env.TOKENKEY);
          res.status(200).json({ token });
        });
      });
  } else {
    res.status(404).send("Not found");
  }
}
