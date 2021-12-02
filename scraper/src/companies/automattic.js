const puppeteer = require("puppeteer");
const fs = require("fs");
const filterJobList = require("../../constants/jobFilter");

const link = "https://automattic.com/work-with-us/";

const automatticSearch = async () => {
	try {
		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();
		await page.goto(link, { waitUntil: "networkidle2", timeout: 12000 });

		const jobs = await page.$$eval(
			"#content > div > div > div:nth-child(10) > div.position-listings > ul > li > a",
			(anchorArray) => {
				return anchorArray.map((anchor) => {
					return {
						title: anchor.textContent.split("Apply")[0],
						link: anchor.href,
					};
				});
			}
		);
		await page.close();
		const filteredJobs = filterJobList(jobs);
		console.log(filteredJobs);
		const data = [];
		const pages = filteredJobs.map(async (job) => {
			const page2 = await browser.newPage();
			await page2.goto(job.link, {
				waitUntil: "networkidle0",
				timeout: 12000,
			});

			const requirements = await page2.$$eval(
				"#content > div.jobs-list > ul > li",
				(textArray) => {
					return textArray.map((text) => text.textContent);
				}
			);
			const description = await page2.$$eval(
				"#content > div.jobs-list > p",
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
			// fs.writeFile("automattic.json", JSON.stringify(data), () => {
			// 	console.log("Automattic: file written");
			// });
			browser.close();
		});
	} catch (err) {
		console.error(`Automattic: error`);
	}
};

module.exports = automatticSearch;
