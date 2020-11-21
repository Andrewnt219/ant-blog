import { BlockRenderer } from "@src/components/BlockRenderer";
import Loading from "@src/components/Loading";
import RenderedYoutube from "@src/components/RenderedYoutube";
import { urlFor } from "@src/lib/sanity/utils/sanityUtils";
import getYouTubeID from "get-youtube-id";
import InternalLink from "../../../components/InternalLink";

export const postSerializer = {
	marks: {
		// NOTE the structure of internalLink comes from post query in [slug]
		internalLink: ({ children, mark }: any) => (
			<InternalLink nextLinkProps={{ href: mark.url }}>{children}</InternalLink>
		),
		link: ({ children, mark }: any) =>
			mark.blank ? (
				<a href={mark.href} target="_blank" rel="noopener noreferrer">
					{children}
				</a>
			) : (
				<a href={mark.href}>{children}</a>
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
		image: (props: any) => {
			const { node } = props;
			const imgSrc = urlFor(node.asset)
				.withOptions(props.options.imageOptions)
				.url();

			return imgSrc ? (
				<figure style={{ margin: 0, width: "100%" }}>
					<img src={imgSrc} style={{ width: "100%" }} alt={node.alt} />
					<figcaption style={{ color: "#aaa", fontStyle: "italic" }}>
						{node.caption}
					</figcaption>
				</figure>
			) : (
				<Loading height="3rem" />
			);
		},
		block: BlockRenderer,
	},
};
