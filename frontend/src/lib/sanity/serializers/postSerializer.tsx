import { BlockRenderer } from "@src/components/BlockRenderer";
import ExternalLink from "@src/components/ExternalLink";
import Loading from "@src/components/Loading";
import PostImage from "@src/components/post/PostImage";
import PostBlockquote from "@src/components/PostBlockquote";
import RenderedYoutube from "@src/components/RenderedYoutube";
import { urlFor } from "@src/lib/sanity/utils/sanityUtils";
import getYouTubeID from "get-youtube-id";
import InternalLink from "../../../components/InternalLink";

export const postSerializer = {
	marks: {
		quote: ({ children, mark }: any) => (
			<PostBlockquote author={mark.author}>{children}</PostBlockquote>
		),
		// NOTE the structure of internalLink comes from post query in [slug]
		internalLink: ({ children, mark }: any) => (
			<InternalLink nextLinkProps={{ href: mark.url }}>{children}</InternalLink>
		),
		link: ({ children, mark }: any) => (
			<ExternalLink href={mark.href} blank>
				{children}
			</ExternalLink>
		),
	},
	// TODO: create a listRender like blockRenderer
	list: (...props: any) => <ul>{console.log(props)}dasdasdasdasdadasdasd</ul>,
	types: {
		youtube: ({ node }: { node: { url: string } }) => {
			const { url } = node;
			const id = getYouTubeID(url);
			return <RenderedYoutube youtubeVideoId={id ?? "dQw4w9WgXcQ"} />;
		},
		image: PostImage,
		block: BlockRenderer,
	},
};
