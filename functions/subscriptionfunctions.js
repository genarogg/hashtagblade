import request from "request";
import userModel from "../models/user.model";
import subModel from "../models/subsucription.model";

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

const generateSubscription = (userObject, planType, auth) => {
  return new Promise((resolve, reject) => {
    request.post(
      `${process.env.PAYPALAPI}/v1/billing/subscriptions`,
      {
        auth,
        body: {
          plan_id: planType,
          quantity: 1,
          subscriber: {
            name: {
              given_name: userObject.first_name,
              surname: userObject.last_name,
            },
            email_address: userObject.email,
          },
          return_url: "http://localhost:3000/api/payments/confirm_subscription",
          cancel_url: "http://localhost:3000/",
        },
        json: true,
      },
      async (err, response) => {
        if (err) {
          reject(err);
        }

        resolve(response.body);
      }
    );
  });
};

const checkSubscription = async (userId) => {
  const myUser = await userModel.findById(userId);
  if (!myUser) {
    throw new Error("Unauthorized");
  }

  const searchSub = await subModel.findOne({ clientId: myUser._id });
  if (!searchSub) {
    return null;
  }

  return searchSub;
};

export { getSubscription, generateSubscription, checkSubscription };
