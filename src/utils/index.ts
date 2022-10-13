export const encodeAllURIComponent = (URI: string): string => {
	const newURI = URI.replace(
		/[^A-Za-z0-9?.]/g,
		(c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
	);

	return newURI;
};

export const extractNumberFromText = (
	text: string,
	ordinal: number
): number => {
	const regex = /\d+/g;
	const numberArray = [...text.matchAll(regex)].map((item) =>
		parseInt(item.toString())
	);

	return numberArray[ordinal];
};
