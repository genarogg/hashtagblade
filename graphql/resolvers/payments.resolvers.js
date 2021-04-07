import request from "request";
import jwt from "jsonwebtoken";
import userModel from "../../models/user.model";

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

const createSubscription = async (_root, { token, type }) => {
  if (type === "" || token === "") {
    throw new Error("Incorrect values");
  }

  let decode;
  try {
    decode = await jwt.verify(token, process.env.TOKENKEY);
  } catch {
    throw new Error("Invalid token");
  }

  const myUser = await userModel.findById(decode._id);
  if (!myUser) {
    throw new Error("User doesn't exist");
  }

  if (myUser.subscriptionId) {
    const plan = await getSubscription(myUser.subscriptionId, auth);
    if (plan.status == "ACTIVE") {
      throw new Error("subscription active use update plan");
    }
    if (
      plan.name != "RESOURCE_NOT_FOUND" &&
      ((plan.plan_id === process.env.PLANBASIC &&
        type === "basic" &&
        !myUser.plan) ||
        (plan.plan_id === process.env.PLANMEDIO &&
          type === "medio" &&
          !myUser.plan) ||
        (plan.plan_id === process.env.PLANADVANCED &&
          type === "advanced" &&
          !myUser.plan))
    ) {
      return plan.links.find((v) => v.rel === "approve").href;
    }
  }

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
            throw new Error(err);
          }
          await userModel.findByIdAndUpdate(myUser._id, {
            subscriptionId: response.body.id,
          });
          return response.body.links[0].href;
        }
      );
      break;
  }
};

export { createSubscription };
