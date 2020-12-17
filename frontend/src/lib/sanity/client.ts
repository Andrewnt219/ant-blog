import client from "@sanity/client";

export default client({
	projectId: "3c8xizwy",
	dataset: "production",
	useCdn: true,
});
export const writableClient = client({
	projectId: "3c8xizwy",
	dataset: "production",
	token: process.env.SANITY_WRITE_TOKEN,
	useCdn: false,
});
