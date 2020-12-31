"use strict";
const mysql = require("mysql");
const db = require("../db");
const config = require("../config");
const jwt = require("jsonwebtoken");

exports.tokenController = (req, res) => {
  var request =
    "SELECT * FROM `users` WHERE email = " + mysql.escape(req.body.email);
  db.connection.query(request, (error, results, fields) => {
    if (error) {
      return res
        .status(500)
        .send({ auth: false, message: "Connection failed" });
    } else {
      if (!results.length) {
        return res.status(404).send({ auth: false, message: "No such user" });
      }
      const user = {
        email: req.body.email,
        date: new Date().getDate(),
      };
      var token = jwt.sign(user, config.secret, {
        expiresIn: config.expiresIn,
      });

      req.token = token;
      let auth = "Bearer " + token;
      res.setHeader("Authorization", auth);

      return res.status(200).send({ auth: true, token: token });
    }
  });
};
