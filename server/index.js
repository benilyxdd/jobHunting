const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes

// create a job
app.post("/jobs", async (req, res) => {
	try {
	} catch (err) {
		console.error(err.message);
	}
});

// get all jobs
app.get("/jobs", async (req, res) => {
	try {
		const allJobs = await pool.query("SELECT * FROM job");
		res.json(allJobs.rows);
	} catch (err) {
		console.error(err.message);
	}
});

app.listen(6000, () => {
	console.log("server has started on port 6000");
});
