import { expect } from "chai";
import { describe, it } from "mocha";

import { encodeSearchURL } from ".";

describe("Google Utils", () => {
	describe("Function", () => {
		it("encodeSearchURL", () => {
			const URL = "https://google.com/";
			const searchParams = { query: "hello" };
			const encodedURL = encodeSearchURL(URL, searchParams);

			expect(encodedURL).to.deep.equal("https://google.com/?q=hello");
		});

		it("encodeSearchURL with special char", () => {
			const URL = "https://google.com/";
			const searchParam = { query: "search with space and !@#$%^&*(" };
			const encodedURL = encodeSearchURL(URL, searchParam);

			expect(encodedURL).to.deep.equal(
				"https://google.com/?q=search%20with%20space%20and%20%21%40%23%24%25%5E%26%2A%28"
			);
		});
	});
});
