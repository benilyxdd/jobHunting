// dependencies
const express = require("express"); // web server
const cors = require("cors"); // cross origin
const morgan = require("morgan"); // logger
const Joi = require("joi"); // data validation

// custom dependencies
const pool = require("./db"); // database login

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// regex
const linkRegex =
	/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;

// typescript version of job schema
/**
interface jobInterface {
	companyName: string;
	description: string;
	link: string;
	niceToHave?: string[];
	requirments: string[];
	responsibilities: string[];
	title: string;
	location: string;
}
*/

// schema
const jobSchema = Joi.object({
	companyName: Joi.string().required(),
	description: Joi.string().required(),
	link: Joi.string().pattern(linkRegex).required(),
	niceToHave: Joi.array().items(Joi.string()),
	requirments: Joi.array().items(Joi.string()).required(),
	responsibilities: Joi.array().items(Joi.string()).required(),
	title: Joi.string().required(),
	location: Joi.string().required(),
});

// create a job
app.post("/jobs", async (req, res) => {
	// body validation
	try {
		const { error } = await jobSchema.validateAsync(req.body);
		if (error) {
			throw new Error(error);
		}
	} catch (validationError) {
		console.error(validationError.message);
	}

	// post data to postre
	const {
		companyName,
		description,
		link,
		niceToHave,
		requirments,
		responsibilities,
		title,
		location,
	} = req.body;

	try {
		let newJob = null;
		if (niceToHave) {
			newJob = await pool.query(
				"INSERT INTO job (company_name, description, link, nice_to_have, requirments, responsibilities, title, location) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
				[
					companyName,
					description,
					link,
					niceToHave,
					requirments,
					responsibilities,
					title,
					location,
				]
			);
		} else {
			newJob = await pool.query(
				"INSERT INTO job (company_name, description, link, requirments, responsibilities, title, location) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
				[
					companyName,
					description,
					link,
					requirments,
					responsibilities,
					title,
					location,
				]
			);
		}
		res.json(newJob.rows);
	} catch (err) {
		console.error(err);
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

// starts server
app.listen(6000, () => {
	console.log("server has started on port 6000");
});
