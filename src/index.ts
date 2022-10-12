import express from "express";
import mongoDb from "./db";

const app = express();
const port = 3000;
const db = mongoDb;

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Express is listening on port ${port}`);
});
