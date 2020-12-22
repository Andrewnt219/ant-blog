import Image from 'next/image';
import React, { ReactElement, ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

import { urlFor } from '@src/lib/sanity/utils/sanityUtils';
import { lqipBackground } from '@src/utils/cssHelpers';

import Loading from '../Loading';

type Props = {
	node: {
		asset: any;
		caption?: string;
		alt?: string;
		metadata: {
			width: string;
			height: string;
			lqip: string;
		};
	};
	options: {
		imageOptions: any;
	};
};

function PostImage({ node, options }: Props): ReactElement {
	const { width, height, lqip } = node.metadata;
	const imgSrc = urlFor(node.asset).withOptions(options.imageOptions).url();

	let renderContent: ReactNode = (
		<Loading height="15rem" loadingText="Loading image" />
	);

	if (imgSrc) {
		renderContent = (
			<Image
				unsized
				src={imgSrc}
				sizes="(min-width: 1280px) 45.64vw, 90vw"
				alt={
					node.alt ?? node.caption ?? "There is no alt text for this picture"
				}
			/>
		);
	}

	return (
		<Container>
			<Picture imgHeight={+height} imgWidth={+width} lqip={lqip}>
				{renderContent}
			</Picture>
			<Caption>{node.caption}</Caption>
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.figure<ContainerProps>`
	${tw`space-y-2 my-8 flex flex-col items-center justify-center`}
`;

// TODO: zoom on click, brighten on hover
type PictureProps = {
	lqip?: string;
	imgWidth: number;
	imgHeight: number;
};
const Picture = styled.div<PictureProps>`
	${tw` relative`}
	width: 100%;
	padding-bottom: calc(100% / ${(p) => p.imgWidth / p.imgHeight});

	div {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;

		${(p) => p.lqip && lqipBackground(p.lqip)}
	}
`;

type CaptionProps = {};
const Caption = styled.figcaption<CaptionProps>`
	${tw`mx-auto text-sm text-ltextColor text-center`}
`;

export default PostImage;
