const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env["DATABASE_USER"],
  host: 'localhost',
  database: process.env["DATABASE_NAME"],
  password: process.env["DATABASE_PASSWORD"],
  port: 5432,
})

// var connectionString =
  // "pg://" +
  //  +
  // ":" +
  //  +
  // "@localhost:5432/" +
  // ;
// 
// var connection = new pg.Client(connectionString);
// connection.connect();
// 
console.log("Database connected...")

module.exports = { pool };
