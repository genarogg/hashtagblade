const express = require("express");
const next = require("next");
const path = require("path");
const cors = require("cors");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(express.static(path.join(__dirname, "public")));
  /* server.use(express.urlencoded({ extended: true }));
  server.use(express.json()); */
  server.use(handle);
  server.listen(3000, () => {});
});
