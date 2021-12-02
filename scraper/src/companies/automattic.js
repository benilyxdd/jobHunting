const puppeteer = require("puppeteer");
const fs = require("fs");
const jobSearchRegex = require("../../constants/jobFilter");

const link = "https://automattic.com/work-with-us/";

const automatticSearch = async () => {
	try {
		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();
		await page.goto(link, { waitUntil: "networkidle2", timeout: 12000 });

		const jobs = await page.$$eval();
	} catch (err) {
		console.error(`Automattic: error`);
	}
};

module.exports = automatticSearch;
