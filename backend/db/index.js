var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/mpc8888db";
var db = pgp(connectionString);
module.exports = db;
