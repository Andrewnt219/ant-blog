import { BlockRenderer } from "@src/components/BlockRenderer";
import ExternalLink from "@src/components/ExternalLink";
import PostImage from "@src/components/post/PostImage";
import PostBlockquote from "@src/components/PostBlockquote";
import RenderedYoutube from "@src/components/RenderedYoutube";
import getYouTubeID from "get-youtube-id";
import InternalLink from "../../../components/InternalLink";
import ListRenderer from "@src/components/ListRenderer";
import tw, { styled } from "twin.macro";

export const postSerializer = {
	marks: {
		author: (props: any) => <Author>{props.children}</Author>,
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
	list: ListRenderer,
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

type AuthorProps = {};
const Author = styled.figcaption<AuthorProps>`
	${tw`text-ltextColor text-sm font-heading font-400 uppercase mt-5`}
`;
