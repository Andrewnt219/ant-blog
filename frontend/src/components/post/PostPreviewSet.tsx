import { calculateReadingMinutes, trimLastWord } from "@src/utils";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, { ReactElement } from "react";
import tw, { styled, theme } from "twin.macro";
import SocialMediaIcon from "../SocialMediaIcon";

type PostPreviewSetProps = {
	posts: PostPreviewProps["data"][];
};

type PostPreviewProps = {
	data: {
		category: {
			title: string;
			slug: string;
		};
		image: {
			url: string;
			alt?: string;
		};
		title: string;
		publishedAt: string;
		rawContent: string;
		snippet: string;
		slug: string;
	};
};

function PostPreviewSet({ posts }: PostPreviewSetProps) {
	return (
		<PostPreviewSetContainer>
			{posts.map((post) => (
				<li key={post.slug}>
					<PostPreview data={post} />
				</li>
			))}
		</PostPreviewSetContainer>
	);
}

function PostPreview({ data }: PostPreviewProps): ReactElement {
	const {
		category,
		title,
		publishedAt,
		slug,
		snippet,
		rawContent,
		image,
	} = data;

	const [titleHead, titleTail] = trimLastWord(title);

	let renderedTitle = (
		<Title>
			<a>{title}</a>
		</Title>
	);
	if (titleHead) {
		renderedTitle = (
			<Title>
				<a>
					{titleHead}
					&nbsp;
					{titleTail}
				</a>
			</Title>
		);
	}

	const linkToPost = "/" + slug;

	return (
		<PostPreviewContainer>
			<Link href={linkToPost} passHref>
				<Thumbnail>
					<Image src={image.url} alt={image.alt ?? title} unsized />
				</Thumbnail>
			</Link>

			<InfoContainer>
				<Link href={"/category/" + category.slug}>
					<Category>
						<a>{category.title}</a>
					</Category>
				</Link>
				<Link href={linkToPost}>{renderedTitle}</Link>
				<SubInfoContainer>
					<SubInfo as="time">
						{dayjs(publishedAt).format("MMM DD YYYY")}
					</SubInfo>

					<SubInfo>
						&nbsp;&nbsp;-&nbsp;&nbsp;{calculateReadingMinutes(rawContent)}
					</SubInfo>
				</SubInfoContainer>

				<Snippet>{snippet}</Snippet>

				<Footer>
					<SocialMediaSet>
						<li>
							<SocialMediaIcon variants="facebook" />
						</li>

						<li>
							<SocialMediaIcon variants="instagram" />
						</li>
					</SocialMediaSet>
				</Footer>
			</InfoContainer>
		</PostPreviewContainer>
	);
}

type PostPreviewSetContainerProps = {};
const PostPreviewSetContainer = styled.ul<PostPreviewSetContainerProps>`
	display: grid;
	gap: 3rem 2rem;

	@media screen and (min-width: ${theme`screens.smTablet`}) {
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
	}
`;

type PostPreviewContainerProps = {};
const PostPreviewContainer = styled.article<PostPreviewContainerProps>`
	height: 100%;

	${tw`flex flex-col`}
`;

type ThumbnailProps = {};
const Thumbnail = styled.a<ThumbnailProps>`
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
		transition: transform 300ms ease, box-shadow 300ms ease;
	}

	:hover {
		img {
			box-shadow: 0 1.5rem 4.5rem -0.5rem rgba(7, 10, 25, 0.25);
			transform: translateY(-0.2rem);
		}
	}
`;

type InfoContainerProps = {};
const InfoContainer = styled.div<InfoContainerProps>`
	${tw`mt-8 mx-auto text-sm space-y-2 relative`}
	width: 90%;
	height: 100%;
	padding-bottom: 5rem;
`;

type CategoryProps = {};
const Category = styled.span<CategoryProps>`
	${tw`uppercase text-accent font-500 inline-block cursor-pointer border-transparent border-b border-solid`}
	font-size: smaller;

	transition: color 200ms ease;

	:hover,
	:focus {
		${tw`text-textColor underline`}
	}
`;

type TitleProps = {};
const Title = styled.h2<TitleProps>`
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

type SubInfoContainerProps = {};
const SubInfoContainer = styled.div<SubInfoContainerProps>``;

type SubInfoProps = {};
const SubInfo = styled.span<SubInfoProps>`
	font-size: smaller;
	${tw`font-500 uppercase inline-block`}
	color: #999;
`;

type SnippetProps = {};
const Snippet = styled.p<SnippetProps>``;

type FooterProps = {};
const Footer = styled.footer<FooterProps>`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
`;

type SocialMediaSetProps = {};
const SocialMediaSet = styled.ul<SocialMediaSetProps>`
	font-size: smaller;
	border-color: #ebebeb;
	${tw`mt-5 flex items-center justify-center border-t border-b border-solid p-3 space-x-3`}
`;

export default PostPreviewSet;
