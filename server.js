const express = require("express");
const next = require("next");
const path = require("path");
const paypal = require("paypal-rest-sdk");
const { connectDB } = require("./database/customConnect");

require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(express.static(path.join(__dirname, "public")));
  /* server.use(express.urlencoded({ extended: true }));
  server.use(express.json()); */
  server.use(handle);
  server.listen(3000, () => {
    connectDB(() => {
      console.log("[db] connected");
    });
  });
});
