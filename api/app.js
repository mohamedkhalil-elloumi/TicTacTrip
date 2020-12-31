var express = require("express");
var app = express();
var db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

var justifyTextController = require("./controllers/justifyTextController");
var tokenController = require("./controllers/tokenController");
const middleware = require("./middleware/global");

// token route
app.route("/api/token").post(tokenController.tokenController);
// todoList Routes
app.post(
  "/api/justify",
  middleware.verifyToken,
  justifyTextController.textJustification
);

module.exports = app;
