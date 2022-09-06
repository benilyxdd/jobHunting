const puppeteer = require("puppeteer");
const fs = require("fs");
const filterJobList = require("../../../constants/jobFilter");

const link = "https://10up.com/careers/";

const tenupSearch = async () => {
	try {
		const browser = await puppeteer.launch({ headless: false });

		// 10up
		const page = await browser.newPage();
		await page.goto(link, { waitUntil: "networkidle2", timeout: 12000 });

		const jobs = await page.$$eval(
			"#open-positions > div > div > div > a",
			(anchorArray) => {
				return anchorArray.map((anchor) => {
					return {
						title: anchor.textContent
							.replace("Promoted", "")
							.replace("Apply Now", "")
							.trim(),
						link: anchor.href,
					};
				});
			}
		);
		await page.close();
		const filteredJobs = filterJobList(jobs);
		const data = [];
		const pages = filteredJobs.map(async (job, index) => {
			const page2 = await browser.newPage();
			await page2.goto(job.link, {
				waitUntil: "networkidle0",
				timeout: 12000,
			});
			const repsonsibilties = await page2.$$eval(
				"#main-content > article > div > div > div.single-careers-content__inner > div:nth-child(2) > ul > li",
				(textArray) => {
					return textArray.map((text) => text.textContent);
				}
			);
			const requirements = await page2.$$eval(
				"#main-content > article > div > div > div.single-careers-content__inner > div:nth-child(4) > ul > li",
				(textArray) => {
					return textArray.map((text) => text.textContent);
				}
			);
			const description = await page2.$$eval(
				"#main-content > article > div > div > div.content > p",
				(textArray) => {
					return textArray.map((text) => text.textContent.trim());
				}
			);
			data.push({
				description: description.join("\n"),
				repsonsibilties,
				requirements,
			});
			await page2.close();
		});

		Promise.all(pages).then(() => {
			fs.writeFile("10up.json", JSON.stringify(data), () => {
				console.log("10up: file written");
			});
			browser.close();
		});
	} catch (err) {
		console.error(`tenup: error`);
	}
};

module.exports = tenupSearch;
