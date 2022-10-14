import _ from "lodash";
import pupperteer from "puppeteer";

import {
	baseURL,
	jobContainerSelector,
	pageNumberSelector,
} from "../../constants/google";
import { extractNumberFromText } from "../../utils";
import { encodeSearchURL } from "../../utils/google";

export const getMaxPageByKeyword = async (keyword: string): Promise<number> => {
	try {
		// launch new browser and page
		const browser = await pupperteer.launch({ headless: true });
		const page = await browser.newPage();
		const URL = encodeSearchURL(baseURL, { query: keyword });
		await page.goto(URL, { waitUntil: "networkidle0" });

		const pageNumberString = await page.$eval(
			pageNumberSelector,
			(el) => el.textContent
		);
		if (_.isNull(pageNumberString)) {
			throw new Error("getMaxPageByKeyword: Nothing is found the selector");
		}

		const maxPage = extractNumberFromText(pageNumberString, 1);

		await browser.close();
		return maxPage;
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
		return -1;
	}
};

export const getJobsURLFromPages = async (
	pageLinks: Array<string>
): Promise<Array<string>> => {
	try {
		const browser = await pupperteer.launch({ headless: true });
		const allJobs: Array<string> = [];
		await Promise.all(
			pageLinks.map(async (URL) => {
				const page = await browser.newPage();
				await page.goto(URL, { waitUntil: "networkidle0" });

				const jobsURL = await page.evaluate<
					string[],
					(selector: string) => Array<string>
				>((selector) => {
					const anchorElements = Array.from(
						document.querySelectorAll(selector)
					) as HTMLAnchorElement[];
					const hrefs = anchorElements.map((anchor) => anchor.href);
					return hrefs;
				}, jobContainerSelector);

				await Promise.all(jobsURL.map(async (URL) => allJobs.push(URL)));

				await page.close();
			})
		);

		await browser.close();
		return allJobs;
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
		return [];
	}
};
