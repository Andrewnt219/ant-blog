import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@src/lib/sanity/client";

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: SanityImageSource) => {
	return builder.image(source);
};
