import { BlockRenderer } from "@src/components/BlockRenderer";
import Loading from "@src/components/Loading";
import RenderedYoutube from "@src/components/RenderedYoutube";
import { urlFor } from "@src/utils/sanityUtils";
import getYouTubeID from "get-youtube-id";

export const postSerializer = {
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
				<Loading />
			);
		},
		block: BlockRenderer,
	},
};
