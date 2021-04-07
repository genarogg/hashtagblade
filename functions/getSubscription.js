import request from "request";

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

export { getSubscription };
