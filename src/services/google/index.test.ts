import { expect } from "chai";
import { describe, it } from "mocha";
import _ from 'lodash';

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
