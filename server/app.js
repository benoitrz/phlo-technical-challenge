const express = require("express");
const routes = require("./routes.js");
const path = require("path");

const port = 8080;
const app = express();
routes(app);

// Serve any static files
app.use(express.static(path.join(__dirname, "../build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

const server = app.listen(port, () => {
  console.log("Listening on port " + port);
});

module.exports = server;
