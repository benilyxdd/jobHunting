import { expect } from "chai";
import { describe, it } from "mocha";

import {
	encodeAllURIComponent,
	extractNumberFromText,
	generateURLsByPageNumber,
} from ".";

describe("Utils", () => {
	describe("Function", () => {
		it("encodeAllURIComponent", () => {
			const tests = [
				"my test.asp?(n(a(m(e",
				"demo (1)",
				"ggwp!!",
				"www.urlencoder.org",
			];
			const solutions = [
				"my%20test.asp?%28n%28a%28m%28e",
				"demo%20%281%29",
				"ggwp%21%21",
				"www.urlencoder.org",
			];

			tests.map((test, idx) => {
				const testResult = encodeAllURIComponent(test);
				expect(testResult).to.be.deep.equal(solutions[idx]);
			});
		});

		it("extractNumberFromText", () => {
			const text =
				"qwe123klsjdkajwqjk123123l;ksd;l90wjkd021mldw 213-9 ;keqw e-0213 12o-0132";
			const solutions = [123, 123123, 90, 21, 213, 9, 213, 12, 132];

			solutions.map((sol, idx) => {
				const testResult = extractNumberFromText(text, idx);
				expect(testResult).to.be.deep.equal(solutions[idx]);
			});
		});

		it("generateURLsByPageNumber", () => {
			const baseURL = "https://google.com/search?q=qwe";
			const numberOfPages = 5;
			const expectedArray = [
				"https://google.com/search?q=qwe&page=1",
				"https://google.com/search?q=qwe&page=2",
				"https://google.com/search?q=qwe&page=3",
				"https://google.com/search?q=qwe&page=4",
				"https://google.com/search?q=qwe&page=5",
			];

			const testResults = generateURLsByPageNumber(baseURL, numberOfPages);
			testResults.map((testResult, idx) =>
				expect(testResult).to.be.equal(expectedArray[idx])
			);
		});
	});
});
