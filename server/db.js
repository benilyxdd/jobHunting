require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	port: 5432,
	database: "jobs",
	password: process.env.DB_PASSWORD,
});

module.exports = pool;
