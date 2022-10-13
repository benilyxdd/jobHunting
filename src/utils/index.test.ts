import { expect } from "chai";
import { describe, it } from "mocha";

import { encodeAllURIComponent, extractNumberFromText } from ".";

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
	});
});
