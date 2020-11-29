import { ENDPOINTS } from "@src/assets/constants/StyleConstants";
import { ImageModel } from "@src/model/sanity";
import { trimLastWord } from "@src/utils";
import Image from "next/image";
import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";
import tw, { styled } from "twin.macro";

/* -------------------------------------------------------------------------- */
/*                                  Category                                  */
/* -------------------------------------------------------------------------- */

type CategoryProps = {
	data: {
		slug: string;
		title: string;
	};
	className?: string;
};

function Category({ data, className }: CategoryProps): ReactElement {
	const { slug, title } = data;

	return (
		<Link href={`${ENDPOINTS.category}/${slug}`}>
			<StyledCategory className={className}>
				<a>{title}</a>
			</StyledCategory>
		</Link>
	);
}

type StyledCategoryProps = {};
const StyledCategory = styled.span<StyledCategoryProps>`
	${tw`uppercase text-accent font-500 inline-block cursor-pointer border-transparent border-b border-solid tracking-widest`}
	font-size: smaller;

	transition: color 300ms ease;

	:hover,
	:focus {
		${tw`text-textColor underline`}
	}
`;

/* -------------------------------------------------------------------------- */
/*                                    Title                                   */
/* -------------------------------------------------------------------------- */

type TitleProps = {
	data: {
		title: string;
		linkToPost: string;
	};
	className?: string;
};

function Title({ data, className }: TitleProps): ReactElement {
	const { title, linkToPost } = data;
	const [titleHead, titleTail] = trimLastWord(title);

	let renderedText = <>{title}</>;

	if (titleHead)
		renderedText = (
			<>
				{titleHead}
				&nbsp;
				{titleTail}
			</>
		);

	return (
		<Link href={linkToPost}>
			<StyledTitle className={className}>
				<a>{renderedText}</a>
			</StyledTitle>
		</Link>
	);
}

type StyledTitleProps = {};
const StyledTitle = styled.h2<StyledTitleProps>`
	${tw`text-xl cursor-pointer`}

	a {
		transition: box-shadow 300ms ease, text-shadow 300ms ease;
	}
	:hover,
	:focus {
		a {
			text-shadow: 2px 2px #fff, 2px -2px #fff, -2px 2px #fff, -2px -2px #fff;
			box-shadow: 0 -1px 0 0 #fff inset,
				0 -2px 0 0 var(--accent-color, #000) inset;
		}
	}
`;

/* -------------------------------------------------------------------------- */
/*                                   SubInfo                                  */
/* -------------------------------------------------------------------------- */

type SubInfoProps = {
	children: ReactNode;
	isTime?: boolean;
	className?: string;
};

function SubInfo({ children, isTime, className }: SubInfoProps): ReactElement {
	return (
		<StyledSubInfo className={className} as={isTime ? "time" : undefined}>
			{children}
		</StyledSubInfo>
	);
}

type StyledSubInfoProps = {};
const StyledSubInfo = styled.span<StyledSubInfoProps>`
	font-size: smaller;
	${tw`font-500 uppercase inline-block tracking-widest`}
	color: #999;
`;

/* -------------------------------------------------------------------------- */
/*                                InfoContainer                               */
/* -------------------------------------------------------------------------- */

type InfoContainerProps = {};
const InfoContainer = styled.div<InfoContainerProps>`
	${tw` mt-8 mx-auto text-sm space-y-2 relative`}

	width: 90%;
	height: 100%;
`;

/* -------------------------------------------------------------------------- */
/*                              SubInfoContainer                              */
/* -------------------------------------------------------------------------- */

type SubInfoContainerProps = {};
const SubInfoContainer = styled.div<SubInfoContainerProps>``;

/* -------------------------------------------------------------------------- */
/*                                   Snippet                                  */
/* -------------------------------------------------------------------------- */

type SnippetProps = {};
const Snippet = styled.p<SnippetProps>``;

/* -------------------------------------------------------------------------- */
/*                                  Thumbnail                                 */
/* -------------------------------------------------------------------------- */
type ThumbnailProps = {
	className?: string;
	sizes: string;
	data: {
		linkToPost: string;
		thumbnail: ImageModel;
	};
};

function Thumbnail({ data, className, sizes }: ThumbnailProps): ReactElement {
	const {
		linkToPost,
		thumbnail: {
			url,
			alt,
			metadata: { lqip },
		},
	} = data;

	return (
		<Link href={linkToPost} passHref>
			<StyledThumbnail lqip={lqip} className={className}>
				<Image
					sizes={sizes}
					src={url}
					alt={alt ?? "Article's thumbnail"}
					unsized
				/>
			</StyledThumbnail>
		</Link>
	);
}

type StyledThumbnailProps = {
	lqip: string;
};
const StyledThumbnail = styled.a<StyledThumbnailProps>`
	${tw`block relative`}
	width: 100%;
	padding-bottom: 66.66%;

	div {
		width: 100%;
		height: 100%;
	}

	img {
		position: absolute;
		top: 0;
		left: 0;
		object-fit: cover;
		height: 100%;
		width: 100%;
		background-image: url(${(p) => p.lqip});
		background-size: cover;
		background-repeat: no-repeat;
		box-shadow: 0 3px 12px -1px rgba(7, 10, 25, 0.2),
			0 22px 27px -20px rgba(7, 10, 25, 0.2);
		transition: transform 300ms ease, box-shadow 300ms ease, filter 300ms ease;
	}

	:hover {
		img {
			filter: brightness(1.05);
			box-shadow: 0 15px 45px -5px rgba(7, 10, 25, 0.25);
			transform: translateY(-0.2rem);
		}
	}
`;

export const Post = {
	Category,
	Title,
	SubInfo,
	InfoContainer,
	SubInfoContainer,
	Snippet,
	Thumbnail,
};
