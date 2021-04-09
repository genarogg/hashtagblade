import userModel from "../../models/user.model";
import subsModel from "../../models/subsucription.model";
import { connectDB } from "../../database/db";

const handler = async (req, res) => {
  await connectDB();
  const body = req.body;
  console.log(body);
  if (req.method === "POST") {

    //Check if exist a event type
    if (body.event_type) {

      //check if exist a subscription pending or other
      const sub = await subsModel.findOne({ paypalId: body.resource.id });
      if (!sub) return res.status(400).json({ error: "sub does't exist" });

      //Check the king of the event
      switch (body.event_type) {

        //if a subscription is activated
        case "BILLING.SUBSCRIPTION.ACTIVATED":
          await subsModel.findByIdAndUpdate(sub._id, {
            status: body.resource.status,
          });
          res.status(200).json({ message: "Done" });
          break;

        //if a subsciption pyment is failed  
        case "BILLING.SUBSCRIPTION.PAYMENT.FAILED":
          await subsModel.findByIdAndUpdate(sub._id, {
            status: "PAYMENT_FAILED",
          });
          res.status(200).json({ message: "Done" });
          break;

        //if a subscription is cacelled
        case "BILLING.SUBSCRIPTION.CANCELLED":
          await subsModel.findByIdAndUpdate(sub._id, {
            status: body.resource.status,
          });
          res.status(200).json({ message: "Done" });
          break;
        
        case "BILLING.SUBSCRIPTION.SUSPENDED":
          await subsModel.findByIdAndUpdate(sub._id, {
            status: body.resource.status,
          });
          res.status(200).json({message: "Done"})
          break;

      }
    }
  } else {
    res.status(200).json({ message: "Only Post method" });
  }
};

export default handler;
