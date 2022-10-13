import { expect } from "chai";
import _ from "lodash";
import { describe, it } from "mocha";

import { getMaxPageByKeyword } from "./index";

describe("Google Services", () => {
	describe("Function", () => {
		it("getMaxPageByKeyword", async () => {
			const keyword = "Software Engineer";
			const res = await getMaxPageByKeyword(keyword);

			expect(res).to.satisfy(_.isInteger);
			expect(res).to.be.greaterThan(0);
		});
	});
});
