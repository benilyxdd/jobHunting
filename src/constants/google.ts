export const baseURL = "https://careers.google.com/jobs/results/";

// Selector in Google Career Page
export const pageNumberSelector =
	"#jump-content > div.gc-wrapper > div > div.wrapper__maincol > main > div > div:nth-child(2) > div > div > p";
export const jobContainerSelector = ".gc-card";

// job details selector
export const jobSelector = {
	addressCountry:
		'[itemprop="jobLocation"] > [itemprop="address"] > [itemprop="addressCountry"]', // HTMLSpanElement
	addressLocality:
		'[itemprop="jobLocation"] > [itemprop="address"] > [itemprop="addressLocality"]', //HTMLSpanElement
	addressRegion:
		'[itemprop="jobLocation"] > [itemprop="address"] > [itemprop="addressRegion"]', // HTMLSpanElement
	applyLink: '[aria-label="Apply for this job (Opens in a new window)"]', // HTMLAnchorElement
	datePosted: '[itemprop="datePosted"]', // HTMLMetaElement
	description: '[class="gc-user-generated-content"][itemprop="description"]', // HTMLDivElement
	qualifications: '[itemprop="qualifications"]', // HTMLDivElement
	responsibilities: '[itemprop="responsibilities"]', // HTMLDivElement
	title: '[itemprop="title"]', // HTMLHeadingElement (h1)
};
