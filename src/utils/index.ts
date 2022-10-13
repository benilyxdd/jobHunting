export const encodeAllURIComponent = (URI: string): string => {
	const newURI = URI.replace(
		/[^A-Za-z0-9]/g,
		(c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
	);

	return newURI;
};
