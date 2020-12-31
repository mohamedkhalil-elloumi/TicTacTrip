const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Hellboy#,123",
  database: "tictactrip",
});

connection.connect((err) => {
  if (!err) {
    console.log("connected to database!!");
  } else {
    console.log(err);
  }
});

module.exports = { connection };
