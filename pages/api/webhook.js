export default function handler(req, res) {
  console.log({ query: req.query, body: req.body });
  res.send("ok");
}
