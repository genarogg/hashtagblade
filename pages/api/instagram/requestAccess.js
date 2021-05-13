import nodeInstagram from "node-instagram";

const ig = new nodeInstagram({
  clientId: process.env.INSTAGRAMID,
  clientSecret: process.env.INSTAGRAMSECRET,
});

export default async function handle(req, res) {
  if (req.method === "GET") {
    res.status(300).redirect(
      ig.getAuthorizationUrl(
        "https://aaaebbc878c3.ngrok.io/api/instagram/getAccess",
        {
          scope: ["user_media", "user_profile"],
        }
      )
    );
  } else {
    res.status(404).send("not found");
  }
}
