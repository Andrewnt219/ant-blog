import { urlFor } from "@src/lib/sanity/utils/sanityUtils";
import Image from "next/image";
import React, { ReactElement, ReactNode } from "react";
import tw, { styled, theme } from "twin.macro";
import Loading from "../Loading";

type Props = {
	node: {
		asset: any;
		caption?: string;
		alt?: string;
	};
	options: {
		imageOptions: any;
	};
};

function PostImage({ node, options }: Props): ReactElement {
	const imgSrc = urlFor(node.asset).withOptions(options.imageOptions).url();

	let renderContent: ReactNode = (
		<Loading height="15rem" loadingText="Loading image" />
	);

	if (imgSrc) {
		renderContent = (
			<>
				<Image
					unsized
					src={imgSrc}
					sizes={`(min-width: ${theme`screens.mdTablet`}) 80vw, 60vw`}
					alt={
						node.alt ?? node.caption ?? "There is no alt text for this picture"
					}
				/>
				<Caption>{node.caption}</Caption>
			</>
		);
	}

	return <Container>{renderContent}</Container>;
}

type ContainerProps = {};
const Container = styled.figure<ContainerProps>`
	${tw`space-y-2 mb-6 flex flex-col items-center justify-center`}
	width: 100%;
`;

type CaptionProps = {};
const Caption = styled.figcaption<CaptionProps>`
	${tw`mx-auto text-sm text-ltextColor text-center`}
`;

export default PostImage;
