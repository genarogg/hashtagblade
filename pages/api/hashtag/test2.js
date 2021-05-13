import Intsa from "scraper-instagram";

const InstaClient = new Intsa();

export default async function (req, res) {
  if (req.method === "POST") {
    if (req.body.search === "" || !req.body.search) {
      res.status(400).json({ error: "body 'search' invalid" });
    }
    InstaClient.searchHashtag(req.body.search).then((data) =>
      res.status(200).json({ data })
    );
  } else {
    res.status(404).send("not found");
  }
}
