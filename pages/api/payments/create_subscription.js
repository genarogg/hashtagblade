import request from "request";
import jwt from "jsonwebtoken";
import userModel from "../../../models/user.model";
import { connectDB } from "../../../database/db";

const getSubscription = (subscriptionId, auth) => {
  return new Promise((resolve, reject) => {
    request.get(
      `${process.env.PAYPALAPI}/v1/billing/subscriptions/${subscriptionId}`,
      { auth, json: true },
      (err, response, body) => {
        if (err) reject(err);
        resolve(body);
      }
    );
  });
};

const auth = {
  user: process.env.PAYPALID,
  pass: process.env.PAYPALSECRET,
};

const createSubscription = async (req, res) => {
  await connectDB();

  if (req.method === "POST") {
    const { type } = req.body;

    const token = req.headers.authorization.split(" ")[1];

    if (type === "") {
      return res.status(400).json({ error: "Incorrect values" });
    }

    let decode;
    try {
      decode = await jwt.verify(token, process.env.TOKENKEY);
    } catch {
      return res.status(400).json({ error: "Invalid token" });
    }

    const myUser = await userModel.findById(decode._id);
    if (!myUser) {
      return res.status(400).json({ error: "User doesn't exist" });
    }

    if (myUser.subscriptionId) {
      const plan = await getSubscription(myUser.subscriptionId, auth);
      if (
        (plan.plan_id === process.env.PLANBASIC &&
          type === "basic" &&
          !myUser.plan) ||
        (plan.plan_id === process.env.PLANMEDIO &&
          type === "medio" &&
          !myUser.plan) ||
        (plan.plan_id === process.env.PLANADVANCED &&
          type === "advanced" &&
          !myUser.plan)
      ) {
        return res.status(200).send({ link: plan.links[0].href });
      }
    }

    console.log("Hola");
    //Choose plan type
    switch (type) {
      case "basic":
        request.post(
          `${process.env.PAYPALAPI}/v1/billing/subscriptions`,
          {
            auth,
            body: {
              plan_id: process.env.PLANBASIC,
              quantity: 1,
              subscriber: {
                name: {
                  given_name: myUser.first_name,
                  surname: myUser.last_name,
                },
                email_address: myUser.email,
              },
              return_url:
                "http://localhost:3000/api/payments/confirm_subscription",
              cancel_url: "http://localhost:3000/",
            },
            json: true,
          },
          async (err, response) => {
            if (err) {
              return res.status(400).json({ error: err });
            }
            await userModel.findByIdAndUpdate(myUser._id, {
              subscriptionId: response.body.id,
            });
            res.status(200).send(response.body);
          }
        );
        break;
    }
  } else {
    res.status(200).json({ message: "Only Post method" });
  }
};

export default createSubscription;
