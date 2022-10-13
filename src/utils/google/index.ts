import { encodeAllURIComponent } from "..";

interface EncodeSearchURLParams {
	query?: string;
}

export const encodeSearchURL = (
	URL: string,
	params: EncodeSearchURLParams
): string => {
	type inputParams = Array<"query">;
	enum SearchParams {
		query = "q",
	}

	const formattedParamsArray = (Object.keys(params) as inputParams).map(
		(key) => {
			const searchParam = SearchParams[key];
			const searchValue = params[key] as string;

			return `${searchParam}=${encodeAllURIComponent(searchValue)}`;
		}
	);
	const formattedParamsString = formattedParamsArray.join();
	const newURL = `${URL}?${formattedParamsString}`;

	return newURL;
};
