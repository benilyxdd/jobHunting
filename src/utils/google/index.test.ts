import { expect } from "chai";
import { describe, it } from "mocha";

import { encodeSearchURL } from ".";

describe("Google Utils", () => {
	describe("Function", () => {
		it("encodeSearchURL", () => {
			const URL = "https://google.com/";

			// test 1
			const searchParams = { query: "hello" };
			const encodedURL = encodeSearchURL(URL, searchParams);
			expect(encodedURL).to.deep.equal("https://google.com/?q=hello");

			// test 2
			const searchParam2 = { query: "search with space and !@#$%^&*(" };
			const encodedURL2 = encodeSearchURL(URL, searchParam2);
			expect(encodedURL2).to.deep.equal(
				"https://google.com/?q=search%20with%20space%20and%20%21%40%23%24%25%5E%26%2A%28"
			);
		});
	});
});
