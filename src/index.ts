import { Browser, ElementHandle, Page } from "puppeteer";

const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
	const browser: Browser = await puppeteer.launch({ headless: false });
	const page: Page = await browser.newPage();
	await page.goto("https://toggl.com/jobs/", {
		waitUntil: "networkidle0",
	});

	const links = await page.$$eval("a", (anchors: Element[]) => {
		return anchors.map((a) => a);
	});
	console.log(links);

	await browser.close();
})();
