import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import tw, { css, styled, theme } from 'twin.macro';

import { ENDPOINTS, FORMAT_CONSTANTS } from '@src/assets/constants/StyleConstants';
import { ImageModel } from '@src/model/sanity';
import { trimLastWord } from '@src/utils';
import { lqipBackground } from '@src/utils/cssHelpers';

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
		thumbnail: ImageModel;
		slug: string;
	};
	isMainPinnedPost: boolean;
};

function PinnedPostSet({ posts }: PinnedPostSetProps) {
	return (
		<StyledPinnedPostSet>
			{posts.map((post, index) => (
				<li key={post.slug}>
					<PinnedPost data={post} isMainPinnedPost={index === 0} />
				</li>
			))}
		</StyledPinnedPostSet>
	);
}

function PinnedPost({ data, isMainPinnedPost }: PinnedPostProps): ReactElement {
	const { title, thumbnail, slug, category, publishedAt, author } = data;
	const [titleHead, titleTail] = trimLastWord(title);

	let renderedTitle = <Title isMain={isMainPinnedPost}>{title}</Title>;
	if (titleHead) {
		renderedTitle = (
			<Title isMain={isMainPinnedPost}>
				{titleHead}
				&nbsp;
				{titleTail}
			</Title>
		);
	}

	const linkToPost = `/${slug}`;

	return (
		<Container>
			<Info>
				<Link href={`${ENDPOINTS.category}/${category.slug}`} passHref>
					<Category>{category.title}</Category>
				</Link>
				<Link href={linkToPost}>
					<a style={{ display: "block" }}>{renderedTitle}</a>
				</Link>

				<SubInfo isMainPinnedPost={isMainPinnedPost}>
					<Author>{author}</Author>

					<Date>
						&nbsp;&nbsp;-&nbsp;&nbsp;
						{dayjs(publishedAt).format(FORMAT_CONSTANTS.dateFormat)}
					</Date>
				</SubInfo>
			</Info>

			<Link href={linkToPost} passHref>
				<Thumbnail lqip={thumbnail.metadata.lqip}>
					<Image src={thumbnail.url} alt={thumbnail.alt ?? title} unsized />
				</Thumbnail>
			</Link>
		</Container>
	);
}

const _3columnsThreshold = theme`screens.smDesktop`;

type StyledPinnedPostSetProps = {};
const StyledPinnedPostSet = styled.ul<StyledPinnedPostSetProps>`
	display: grid;
	gap: 0.1rem;
	grid-template-rows: 1.5fr 1fr 1fr;

	@media screen and (min-width: ${theme`screens.lgMobile`}) {
		grid-template-columns: 50% 50%;
		grid-template-rows: 1.5fr 1fr;

		& > li:first-of-type {
			grid-column: 1 / -1;
		}
	}

	@media screen and (min-width: ${_3columnsThreshold}) {
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

	/* Select the thumbnail image */
	:hover + a img {
		filter: brightness(0.25);
		transform: scale(1.1);
	}
`;

type SubInfoProps = {
	isMainPinnedPost: boolean;
};
const SubInfo = styled.div<SubInfoProps>`
	${(p) =>
		!p.isMainPinnedPost &&
		css`
			display: none;

			@media screen and (min-width: ${_3columnsThreshold}) {
				display: inline-block;
			}
		`}
`;

type CategoryProps = {};
const Category = styled.a<CategoryProps>`
	${tw`bg-accent py-1 px-2 tracking-widest`}
	font-size: smaller;
	transition: background-color 200ms ease;

	:hover,
	:focus {
		${tw`bg-black`}
	}
`;

type TitleProps = {
	isMain: boolean;
};
const Title = styled.h2<TitleProps>`
	${tw`font-600 text-2xl`}
	text-transform: none;

	${(p) =>
		!p.isMain &&
		css`
			${tw`text-xl`}
		`}

	@media screen and (min-width: ${_3columnsThreshold}) {
		${tw`text-4xl`}

		${(p) =>
			!p.isMain &&
			css`
				${tw`text-3xl`}
			`}
	}
`;

type AuthorProps = {};
const Author = styled.span<AuthorProps>`
	${tw`cursor-pointer`}

	:hover, :focus {
		${tw`underline`}
	}
`;

type DateProps = {};
const Date = styled.time<DateProps>``;

type ThumbnailProps = {
	lqip: string;
};
const Thumbnail = styled.a<ThumbnailProps>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
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

		transition: transform 300ms ease, filter 300ms ease;

		${(p) => lqipBackground(p.lqip)}
	}

	:hover,
	:focus {
		img {
			filter: brightness(0.7);
			transform: scale(1.06);
		}
	}
`;

export default PinnedPostSet;
