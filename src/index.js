import puppeteer from "puppeteer";
import fs from "fs";

const link = "https://google.com";

(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto(link, {
		waitUntil: "networkidle0",
	});

	const allLabels = await page.$$eval("label", (labels) => {
		console.log(labels);
		return labels.map((label) => label);
	});
	console.log(allLabels);

	// await browser.close();
})();
