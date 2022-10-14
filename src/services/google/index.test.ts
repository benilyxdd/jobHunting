import { expect } from "chai";
import _ from "lodash";
import { describe, it } from "mocha";

import { generateURLsByPageNumber } from "../../utils";
import { encodeSearchURL } from "../../utils/google";
import { getJobsURLFromPages, getMaxPageByKeyword } from "./index";

describe("Google Services", () => {
	describe("Function", () => {
		it("getMaxPageByKeyword", async () => {
			const keyword = "Software Engineer";
			const res = await getMaxPageByKeyword(keyword);

			expect(res).to.satisfy(_.isInteger);
			expect(res).to.be.greaterThan(0);
		});

		it("getJobsURLFromPages", async () => {
			const query = "Staffing Manager";
			const baseURL = "https://careers.google.com/jobs/results/";
			const searchURL = encodeSearchURL(baseURL, { query });
			const maxPage = await getMaxPageByKeyword(query);
			const testURLs = generateURLsByPageNumber(searchURL, maxPage);

			const testResults = await getJobsURLFromPages(testURLs);
			testResults.map((result) => {
				expect(result).to.match(
					/https:\/\/careers\.google\.com\/jobs\/results\/\d+/
				);
			});
		});
	});
});
