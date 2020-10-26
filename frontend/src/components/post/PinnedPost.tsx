import { trimLastWord } from "@src/utils";
import Link from "next/link";
import React, { ReactElement } from "react";
import tw, { styled } from "twin.macro";

type Props = {
	data: {
		category: string;
		title: string;
		image: {
			url: string;
			alt?: string;
		};
		slug: string;
	};
};

function PinnedPost({ data }: Props): ReactElement {
	const { title, image, slug, category } = data;
	let renderedTitle = <Title>{title}</Title>;

	const [titleHead, titleTail] = trimLastWord(title);
	if (titleHead) {
		renderedTitle = (
			<Title>
				{titleHead}
				&nbsp;
				{titleTail}
			</Title>
		);
	}

	return (
		<Container>
			<Link href={`/${slug}`} passHref>
				<Thumbnail>
					<img src={image.url} alt={image.alt ?? "Pinned post thumbnail"} />
				</Thumbnail>
			</Link>

			<Info>
				<Category>{category}</Category>
				{renderedTitle}
			</Info>
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.article<ContainerProps>`
	${tw`text-primary relative w-full h-full flex flex-col justify-end mx-2`}
	height: 12rem;
`;

type InfoProps = {};
const Info = styled.div<InfoProps>`
	${tw`relative z-10 space-y-1 p-3 relative`}
	background: rgba(0,0,0,.6);
`;

type CategoryProps = {};
const Category = styled.span<CategoryProps>`
	${tw`uppercase font-500 bg-accent absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
	font-size: .5rem;
	padding: 0 0.5em;
`;

type TitleProps = {};
const Title = styled.h2<TitleProps>`
	${tw`text-primary font-600 text-center`}
`;

type ThumbnailProps = {};
const Thumbnail = styled.a<ThumbnailProps>`
	${tw`w-full h-full block absolute top-0 left-0`}

	img {
		${tw`object-cover w-full h-full`}
	}
`;

export default PinnedPost;
