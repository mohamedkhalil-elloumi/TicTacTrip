var jwt = require("jsonwebtoken");
var config = require("../config");

var usersLimitRate = [];

verifyToken = (req, res, next) => {
  let auth = req.headers["authorization"];
  let token = auth.split(" ")[1];

  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res.status(500).send({ auth: false, message: "Invalid token" });
    }
    // if everything good, save to request for use in other routes
    req.token = decoded;
    next();
  });
};

checkUserRate = (req, res) => {
  let token = req.token;

  if (!token) {
    return res.status(403).send({ message: "No token provided." });
  }

  let text = req.body;
  let tokenDate = token.date;
  let currentDate = new Date().getDate();

  if (tokenDate !== currentDate) {
    token.date = new Date();
    usersLimitRate[token.email] = text.length;
  } else {
    let words = usersLimitRate[token.email];
    if (
      words &&
      (words > config.wordsLimit || words + text.length > config.wordsLimit)
    ) {
      return res.status(402).send({ message: "Payment required" });
    } else {
      if (!words) {
        usersLimitRate[token.email] = text.length;
      } else {
        usersLimitRate[token.email] += text.length;
      }
      return true;
    }
  }
};

module.exports = { verifyToken, checkUserRate };
