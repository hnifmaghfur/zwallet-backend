const mysql = require("mysql");

// const conn = mysql.createPool({
//   connectionLimit: process.env.LIMIT,
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// conn.getConnection((err) => {
//   if (!err) {
//     console.log("Success connect to DB");
//   }
// });

// module.exports = conn;

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nifinda7", //aws
  // password: "",
  database: "zwallet",
});

conn.connect();
module.exports = conn;
