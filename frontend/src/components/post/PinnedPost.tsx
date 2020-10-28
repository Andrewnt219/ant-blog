import { trimLastWord } from "@src/utils";
import Link from "next/link";
import React, { ReactElement } from "react";
import tw, { styled } from "twin.macro";
import Image from "next/image";

type Props = {
	data: {
		category: {
			title: string;
			slug: string;
		};
		title: string;
		image: {
			url: string;
			alt?: string;
		};
		slug: string;
	};
};
// TODO clarify hovering category
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

	const linkToPost = `/${slug}`;

	return (
		<Container>
			<Link href={linkToPost} passHref>
				<Thumbnail>
					<Image
						src={image.url}
						alt={image.alt ?? "Pinned post thumbnail"}
						unsized
					/>
				</Thumbnail>
			</Link>

			<Info>
				<Link href={`/category/${category.slug}`} passHref>
					<Category>{category.title}</Category>
				</Link>

				<Link href={linkToPost}>
					<a>{renderedTitle}</a>
				</Link>
			</Info>
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.article<ContainerProps>`
	${tw`text-primary relative w-full h-full flex flex-col justify-end relative`}
	height: 12rem;

	::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		width: 90%;
		height: 90%;
		border: 1px solid white;
		transform: translate(-50%, -50%);
		${tw`z-10`}
		pointer-events: none;
	}
`;

type InfoProps = {};
const Info = styled.div<InfoProps>`
	${tw`relative z-10 space-y-1 px-6 pt-3 pb-8 relative`}
	background: rgba(0,0,0,.6);
`;

type CategoryProps = {};
const Category = styled.a<CategoryProps>`
	${tw`uppercase font-500 bg-accent absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs`}

	padding: 0 0.5em;
`;

type TitleProps = {};
const Title = styled.h2<TitleProps>`
	${tw`text-primary font-600 text-center mt-3 text-lg`}
`;

type ThumbnailProps = {};
const Thumbnail = styled.a<ThumbnailProps>`
	${tw`w-full h-full block absolute top-0 left-0`}

	img {
		${tw`object-cover w-full h-full`}
	}
`;

export default PinnedPost;
