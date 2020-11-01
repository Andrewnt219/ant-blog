import { trimLastWord } from "@src/utils";
import Link from "next/link";
import React, { ReactElement } from "react";
import tw, { css, styled, theme } from "twin.macro";
import Image from "next/image";
import dayjs from "dayjs";

type PinnedPostSetProps = {
	posts: PinnedPostProps["data"][];
};

type PinnedPostProps = {
	data: {
		category: {
			title: string;
			slug: string;
		};
		title: string;
		author: string;
		publishedAt: string;
		image: {
			url: string;
			alt?: string;
		};
		slug: string;
	};
	isMainPinnedPost: boolean;
};

function PinnedPostSet({ posts }: PinnedPostSetProps) {
	return (
		<StyledPinnedPostSet>
			{posts.map((post, index) => (
				<li key={post.slug}>
					<PinnedPost data={post} isMainPinnedPost={index == 0} />
				</li>
			))}
		</StyledPinnedPostSet>
	);
}

// TODO clarify hovering category
function PinnedPost({ data, isMainPinnedPost }: PinnedPostProps): ReactElement {
	const { title, image, slug, category, publishedAt, author } = data;
	const [titleHead, titleTail] = trimLastWord(title);

	let renderedTitle = <Title>{title}</Title>;
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
					<a style={{ display: "block" }}>{renderedTitle}</a>
				</Link>

				<SubInfo isMainPinnedPost={isMainPinnedPost}>
					<Author>{author}</Author>

					<Date>
						&nbsp;&nbsp;-&nbsp;&nbsp;{dayjs(publishedAt).format("MMM DD YYYY")}
					</Date>
				</SubInfo>
			</Info>
		</Container>
	);
}

type StyledPinnedPostSetProps = {};
const StyledPinnedPostSet = styled.ul<StyledPinnedPostSetProps>`
	display: grid;
	gap: 0.1rem;
	grid-template-rows: 1.5fr 1fr 1fr;

	@media screen and (min-width: ${theme`screens.lgMobile`}) {
		grid-template-columns: 50% 50%;
		grid-template-rows: 1.5fr 1fr 1fr;

		& > li:first-of-type {
			grid-column: 1 / -1;
		}
	}

	/* NOTE: This is for 3 columns layout */
	@media screen and (min-width: ${theme`screens.lgTablet`}) {
		grid-template-columns: 1.5fr 1fr 1fr;
		grid-template-rows: initial;

		height: 25rem;

		& > li:first-of-type {
			grid-column: auto;
		}
	}
`;

type ContainerProps = {};
const Container = styled.article<ContainerProps>`
	${tw`relative text-primary text-sm font-500 flex items-end p-5`}
	width: 100%;
	height: 100%;
	min-height: 15rem;
`;

type InfoProps = {};
const Info = styled.div<InfoProps>`
	${tw`relative z-10 space-y-2 uppercase`}
`;

type SubInfoProps = {
	isMainPinnedPost: boolean;
};
const SubInfo = styled.div<SubInfoProps>`
	${(p) =>
		!p.isMainPinnedPost &&
		css`
			display: none;

			/* NOTE: This is for 3 columns layout */
			@media screen and (min-width: ${theme`screens.lgTablet`}) {
				display: inline-block;
			}
		`}
`;

type CategoryProps = {};
const Category = styled.a<CategoryProps>`
	${tw`bg-accent py-1 px-2 `}
	font-size: smaller;
`;

type TitleProps = {};
const Title = styled.h2<TitleProps>`
	${tw`font-600 text-2xl`}
	text-transform: none;

	/* NOTE: This is for 3 columns layout */
	@media screen and (min-width: ${theme`screens.lgTablet`}) {
		${tw`text-4xl`}
	}
`;

type AuthorProps = {};
const Author = styled.span<AuthorProps>``;

type DateProps = {};
const Date = styled.time<DateProps>``;

type ThumbnailProps = {};
const Thumbnail = styled.a<ThumbnailProps>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: block;

	/* NOTE: this is a fix for next/image */
	div {
		width: 100%;
		height: 100%;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: brightness(0.5);
	}
`;

export default PinnedPostSet;