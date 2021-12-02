const jobTitle = [
	"frontend developer",
	"frontend engineer",
	"front end developer",
	"front end engineer",
	"backend developer",
	"backend engineer",
	"back end developer",
	"back end engineer",
	"javascript engineer",
	"javascript developer",
	"software engineer",
];

const jobSearchRegex =
	/^((frontend|front end|backend|back end|software|javascript|web|fullstack|full stack)\s(developer|engineer))|^(junior|(?!senior)|(?!lead))\s(frontend|front end|backend|back end|software|javascript|web|fullstack|full stack)\s(developer|engineer)/;

const filterJobList = (list) =>
	list.filter((job) => job.title.toLowerCase().match(jobSearchRegex));

module.exports = filterJobList;
