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
};

function Category({ data }: CategoryProps): ReactElement {
	const { slug, title } = data;

	return (
		<Link href={"/category/" + slug}>
			<StyledCategory>
				<a>{title}</a>
			</StyledCategory>
		</Link>
	);
}

type StyledCategoryProps = {};
const StyledCategory = styled.span<StyledCategoryProps>`
	${tw`uppercase text-accent font-500 inline-block cursor-pointer border-transparent border-b border-solid`}
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
};

function Title({ data }: TitleProps): ReactElement {
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
			<StyledTitle>
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
};

function SubInfo({ children, isTime }: SubInfoProps): ReactElement {
	return (
		<StyledSubInfo as={isTime ? "time" : undefined}>{children}</StyledSubInfo>
	);
}

type StyledSubInfoProps = {};
const StyledSubInfo = styled.span<StyledSubInfoProps>`
	font-size: smaller;
	${tw`font-500 uppercase inline-block`}
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
	data: {
		linkToPost: string;
		image: {
			url: string;
			alt?: string;
		};
	};
};

function Thumbnail({ data }: ThumbnailProps): ReactElement {
	const {
		linkToPost,
		image: { url, alt },
	} = data;
	return (
		<Link href={linkToPost} passHref>
			<StyledThumbnail>
				<Image src={url} alt={alt ?? "Article's thumbnail"} unsized />
			</StyledThumbnail>
		</Link>
	);
}

type StyledThumbnailProps = {};
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
		box-shadow: 0 0.3rem 1.2rem -0.1rem rgba(7, 10, 25, 0.2),
			0 2.2rem 2.7rem -2rem rgba(7, 10, 25, 0.2);
		transition: transform 300ms ease, box-shadow 300ms ease, filter 300ms ease;
	}

	:hover {
		img {
			filter: brightness(1.05);
			box-shadow: 0 1.5rem 4.5rem -0.5rem rgba(7, 10, 25, 0.25);
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