import nodeInstagram from "node-instagram";

const ig = new nodeInstagram({
  clientId: process.env.INSTAGRAMID,
  clientSecret: process.env.INSTAGRAMSECRET,
});

export default async function handle(req, res) {
  if (req.method === "GET") {
    const data = await ig.authorizeUser(
      req.query.code,
      process.env.URI + "/api/instagram/getAccess"
    );
    res.json({ data });
  } else {
    res.status(404).send("not found");
  }
}
