declare module "sanity" {
	type SanityClientError = {
		description: string;
		end: number;
		query: string;
		start: number;
		type: string;
	};

	type SanityClientErrorResponse = {
		details: SanityClientError;
		response: {
			body: {
				error: SanityClientError;
			};
			headers: {
				"content-length": string;
				"cotent-type": string;
			};
			method: string;
			statusCode: number;
			statusMessage: string;
			url: string;
		};
		responseBody: string;
		statusCode: number;
	};
}
