import { FORMAT_CONSTANTS } from "@src/assets/constants/StyleConstants";
import { trimLastWord } from "@src/utils";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, { ReactElement } from "react";
import tw, { styled, theme } from "twin.macro";

type Props = {
	data: {
		thumbnailSrc: string;
		category: {
			title: string;
			slug: string;
		};
		title: string;
		author: {
			name: string;
			imageUrl: string;
		};
		publishedAt: string;
		readMinute: string;
	};
};

function PostHeader({ data }: Props): ReactElement {
	const {
		category,
		title,
		author,
		publishedAt,
		readMinute,
		thumbnailSrc,
	} = data;

	return (
		<Container bgSrc={thumbnailSrc}>
			<InfoContainer>
				<Link href={"/category/" + category.slug} passHref>
					<Category>{category.title}</Category>
				</Link>
				<Title>{preventOrphanText(title)}</Title>
				<SubTitleContainer>
					<SubTitle>
						By {author.name}
						<Separator />
					</SubTitle>
					<SubTitle>
						{dayjs(publishedAt).format(FORMAT_CONSTANTS.dateFormat)}
						<Separator />
					</SubTitle>

					<SubTitle>{readMinute}</SubTitle>
				</SubTitleContainer>

				<ImageContainer>
					<Image
						unsized
						src={author.imageUrl}
						alt={"Image of " + author.name}
					/>
				</ImageContainer>
			</InfoContainer>
		</Container>
	);
}

type ContainerProps = {
	bgSrc: string;
};
const Container = styled.header<ContainerProps>`
	${tw`relative`}
	padding-bottom: max(37.5%, 25rem);

	background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
		url("${(p) => p.bgSrc}");
	background-size: cover;
	background-position: center center;
	width: 100%;
	${tw`mb-12`}

	@media screen and (min-width: ${theme`screens.smDesktop`}) {
		background-attachment: fixed;
	}
`;

type InfoContainerProps = {};
const InfoContainer = styled.div<InfoContainerProps>`
	${tw`absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col text-xs  text-primary font-500 space-y-2  `}
	padding: 2.5% 12.5%;

	@media screen and (min-width: ${theme`screens.smDesktop`}) {
		padding: 2.5% 15%;
	}
`;

type CategoryProps = {};
const Category = styled.span<CategoryProps>`
	${tw`uppercase bg-textColor py-1 px-2 cursor-pointer`}

	transition: background 200ms ease, color 200ms ease;

	:hover,
	:focus {
		${tw`bg-primary text-textColor`}
	}
`;

type TitleProps = {};
const Title = styled.h1<TitleProps>`
	${tw`text-2xl font-700 text-center`}

	@media screen and (min-width: ${theme`screens.mdTablet`}) {
		${tw`text-3xl`}
	}

	@media screen and (min-width: ${theme`screens.lgTablet`}) {
		${tw`text-5xl`}
	}
`;

type SubTitleContainerProps = {};
const SubTitleContainer = styled.div<SubTitleContainerProps>`
	${tw`flex items-center uppercase flex-wrap justify-center`}
`;

type SubTitleProps = {};
const SubTitle = styled.span<SubTitleProps>``;

type SeparatorProps = {};
const Separator = styled.span<SeparatorProps>`
	::before {
		content: "-";
		${tw`px-1`}
	}
`;

type ImageContainerProps = {};
const ImageContainer = styled.div<ImageContainerProps>`
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
	overflow: hidden;

	div,
	img {
		width: 100%;
		height: 100%;
	}

	img {
		object-fit: cover;
		object-position: center;
	}
`;

function preventOrphanText(title: string) {
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
	return renderedText;
}

export default PostHeader;
