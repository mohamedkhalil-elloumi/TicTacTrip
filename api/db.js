const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: process.env['DATABASE_USER'],
  password: process.env['DATABASE_PASSWORD'],
  database: process.env['DATABASE_NAME'],
});

connection.connect((err) => {
  if (!err) {
    console.log("connected to database!!");
  } else {
    console.log(err);
  }
});

module.exports = { connection };
