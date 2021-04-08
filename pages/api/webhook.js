import userModel from "../../models/user.model";
import subsModel from "../../models/subsucription.model";

const handler = async (req, res) => {
  const body = req.body;
  if (req.method === "POST") {
    console.log({ body });
    if (body.event_type) {
      switch (body.event_type) {
        case "BILLING.SUBSCRIPTION.ACTIVATED":
          const sub = await subsModel.findOne({ paypalId: body.resource.id });
          if (!sub) return res.status(400).json({ error: "sub does't exist" });
          const updateSub = await subsModel.findByIdAndUpdate(sub._id, {
            status: body.resource.status,
          });
          res.status(200).json({ message: "Done" });
          break;
      }
    }
  } else {
    res.status(200).json({ message: "Only Post method" });
  }
};

export default handler;
