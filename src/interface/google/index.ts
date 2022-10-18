export interface Job {
	addressCountry: string;
	addressLocality: string;
	addressRegion: string;
	applyLink: string;
	datePosted: Date;
	description: string;
	jobLink: string;
	qualifications: Array<string>;
	responsibilities: Array<string>;
	title: string;
}
