import { FORMAT_CONSTANTS } from "@src/assets/constants/StyleConstants";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, { ReactElement } from "react";
import tw, { styled } from "twin.macro";

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
			<Link href={"/category/" + category.slug} passHref>
				<Category>{category.title}</Category>
			</Link>
			<Title>{title}</Title>
			<SubTitleContainer>
				<SubTitle>By {author.name}</SubTitle>
				&nbsp;&nbsp;-&nbsp;&nbsp;
				<SubTitle>
					{dayjs(publishedAt).format(FORMAT_CONSTANTS.dateFormat)}
				</SubTitle>
				&nbsp;&nbsp;-&nbsp;&nbsp;
				<SubTitle>{readMinute}</SubTitle>
			</SubTitleContainer>

			<ImageContainer>
				<Image unsized src={author.imageUrl} alt={"Image of " + author.name} />
			</ImageContainer>
		</Container>
	);
}

type ContainerProps = {
	bgSrc: string;
};
const Container = styled.header<ContainerProps>`
	${tw`text-primary flex justify-center items-center flex-col text-xs  font-500 space-y-2`}
	padding: 2.5% 25%;

	background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
		url(${(p) => p.bgSrc});
	background-size: cover;
	background-position: center center;
	background-attachment: fixed;
	width: 100vw;
	height: 75vh;
	margin-bottom: 10vh;
`;

type CategoryProps = {};
const Category = styled.span<CategoryProps>`
	${tw`uppercase bg-textColor  py-1 px-2 cursor-pointer`}

	transition: background 200ms ease, color 200ms ease;

	:hover,
	:focus {
		${tw`bg-primary text-textColor`}
	}
`;

type TitleProps = {};
const Title = styled.h1<TitleProps>`
	${tw`text-5xl font-700 text-center`}
`;

type SubTitleContainerProps = {};
const SubTitleContainer = styled.div<SubTitleContainerProps>`
	${tw`flex items-center uppercase`}
`;

type SubTitleProps = {};
const SubTitle = styled.span<SubTitleProps>``;

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

export default PostHeader;
