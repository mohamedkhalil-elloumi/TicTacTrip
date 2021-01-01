var express = require("express");
var app = express();
require("dotenv").config({ path: __dirname + "/../.env" });
var db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

var justifyTextController = require("./controllers/justifyTextController");
var tokenController = require("./controllers/tokenController");
const middleware = require("./middleware/global");

// Home route
app.route("/").get((req, res) => {
  return res.status(200).send("<h1> Welcome to TicTacTrip Api </h1>");
});

// token route
app.route("/api/token").post(tokenController.tokenController);
// todoList Routes
app.post(
  "/api/justify",
  middleware.verifyToken,
  justifyTextController.textJustification
);

module.exports = app;
