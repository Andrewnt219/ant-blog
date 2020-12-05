import sanityClient from "@src/lib/sanity/client";

/**
 * Interface for useSWR
 * @param args [0] query string, [1] params object
 */
export const sanityFetcher = (...args: any[]) =>
	sanityClient.fetch(args[0], args[1]);
