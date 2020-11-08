import sanityClient from "@src/lib/sanity/client";

export const sanityFetcher = (args: string) => sanityClient.fetch(args);
