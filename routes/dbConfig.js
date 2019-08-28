//Initiallising connection string
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "dts.ceaqf6rbw7sh.us-east-2.rds.amazonaws.com",
  user: "dts",
  password: "pass1234",
  database: 'dts'
});

module.exports = con;