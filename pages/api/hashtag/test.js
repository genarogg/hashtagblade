import extractToken from "../../../functions/extractToken";
import Intsa from "scraper-instagram";

const InstaClient = new Intsa();

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (
      !req.body.hashtags ||
      !Array.isArray(req.body.hashtags) ||
      !req.body.hashtags.every((v) => typeof v === "string")
    ) {
      return res.status(400).json({ error: "Argumentos incorrectos" });
    }

    if (req.body.hashtags.length > 5) {
      return res.status(400).json({ error: "Maximo 5 hashtags" });
    }

    //get Hashtag
    Promise.all(req.body.hashtags.map((v) => InstaClient.getHashtag(v))).then(
      (data) => {
        return res.status(200).json({ data });
      }
    );
  } else {
    res.status(404).send("Not Found");
  }
}
