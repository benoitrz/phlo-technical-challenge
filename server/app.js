const express = require("express");
const routes = require("./routes.js");

const port = 8080;
const app = express();
routes(app);

const server = app.listen(port, () => {
  console.log("Listening on port " + port);
});

module.exports = server;
