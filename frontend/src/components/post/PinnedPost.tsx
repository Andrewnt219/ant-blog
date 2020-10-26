import Link from "next/link";
import React, { ReactElement } from "react";
import tw, { css, styled, theme } from "twin.macro";
import dayjs from "dayjs";

type Props = {
	isMain: boolean;
	data: {
		category: string;
		author: string;
		publishedAt: string;
		title: string;
		image: {
			url: string;
			alt?: string;
		};
		slug: string;
	};
};

function PinnedPost({ data, isMain }: Props): ReactElement {
	const { category, author, publishedAt, title, image, slug } = data;

	return (
		<Container>
			<Link href={`/${slug}`} passHref>
				<Thumbnail>
					<img src={image.url} alt={image.alt ?? "Pinned post thumbnail"} />
				</Thumbnail>
			</Link>

			<Info>
				<Category>{category}</Category>
				<Title isMain={isMain}>{title}</Title>
				<SubInfo isMain={isMain}>
					<AuthorName>{author}</AuthorName>
					&nbsp;&nbsp;-&nbsp;&nbsp;
					<Date>{dayjs(publishedAt).format("MMM DD YYYY")}</Date>
				</SubInfo>
			</Info>
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.article<ContainerProps>`
	${tw`text-primary relative w-full h-full flex flex-col justify-end p-3`}
`;

type InfoProps = {};
const Info = styled.div<InfoProps>`
	${tw`relative z-10 space-y-1`}
`;

type CategoryProps = {};
const Category = styled.span<CategoryProps>`
	${tw`uppercase font-500 bg-accent`}
	padding: 0.1rem 0.2rem;
`;

type TitleProps = {
	isMain: boolean;
};
const Title = styled.h2<TitleProps>`
	${tw`text-primary font-600 text-xl`}
	width: max-content;
	max-width: 100%;

	${(p) =>
		!p.isMain &&
		css`
			${tw`text-lg`}
		`}
`;

type SubInfoProps = {
	isMain: boolean;
};
const SubInfo = styled.div<SubInfoProps>`
	display: ${(p) => !p.isMain && "none"};

	@media screen and (min-width: ${theme`screens.lgMobile`}) {
		display: inline-block;
	}
`;

type AuthorNameProps = {};
const AuthorName = styled.span<AuthorNameProps>`
	${tw`uppercase font-500`}
`;

type DateProps = {};
const Date = styled.time<DateProps>`
	${tw`uppercase font-500`}
`;

type ThumbnailProps = {};
const Thumbnail = styled.a<ThumbnailProps>`
	${tw`w-full h-full block absolute top-0 left-0`}

	img {
		${tw`object-cover w-full h-full`}
	}
`;

export default PinnedPost;
