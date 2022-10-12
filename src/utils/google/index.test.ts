import { expect } from "chai";
import { describe, it } from "mocha";

import { encodeSearchURL } from ".";

describe("Google Service", () => {
	describe("Function", () => {
		it("encodeSearchURL", () => {
			const URL = "https://google.com";
			const searchParams = { query: "hello" };
			const encodedParmas = encodeSearchURL(URL, searchParams);

			expect(encodedParmas).to.deep.equal("https://google.com/?q=hello");
		});
	});
});
