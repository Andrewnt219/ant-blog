import {
	ENDPOINTS,
	FORMAT_CONSTANTS,
	SizeKey,
} from "@src/assets/constants/StyleConstants";
import { preventOrphanText } from "@src/utils";
import dayjs from "dayjs";
import Link from "next/link";
import React, { ReactElement, useMemo } from "react";
import tw, { styled, theme } from "twin.macro";
import { createImageSources } from "@src/utils/postHelpers";
import { responsiveBackground } from "@src/utils/cssHelpers";

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
			slug: string;
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

	const sources = useMemo(
		() => createImageSources(thumbnailSrc, { format: "webp", quality: 50 }),
		[thumbnailSrc]
	);

	return (
		<Container bgSources={sources}>
			<InfoContainer>
				<Link href={`${ENDPOINTS.category}/${category.slug}`}>
					<a>
						<Category>{category.title}</Category>
					</a>
				</Link>
				<Title>{preventOrphanText(title)}</Title>
				<SubTitleContainer>
					<Link href={`${ENDPOINTS.author}/${author.slug}`}>
						<a>
							<SubTitle underlineOnHover>By {author.name}</SubTitle>
							<Separator />
						</a>
					</Link>

					<SubTitle as="time">
						{dayjs(publishedAt).format(FORMAT_CONSTANTS.dateFormat)}
						<Separator />
					</SubTitle>

					<SubTitle>{readMinute}</SubTitle>
				</SubTitleContainer>
			</InfoContainer>
		</Container>
	);
}

type ContainerProps = {
	bgSources: Map<SizeKey, string | null>;
};
const Container = styled.header<ContainerProps>`
	${tw`relative`}
	padding-bottom: max(37.5%, 25rem);
	background-size: cover;
	background-position: center center;
	width: 100%;
	${tw`mb-12`}

	${(p) =>
		responsiveBackground(
			p.bgSources,
			"linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))"
		)}

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
	${tw`uppercase bg-textColor py-1 px-2 cursor-pointer tracking-widest`}

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
	${tw`flex items-center uppercase flex-wrap justify-center tracking-widest`}
`;

type SubTitleProps = {
	underlineOnHover?: boolean;
};
const SubTitle = styled.span<SubTitleProps>`
	:hover,
	:focus {
		text-decoration: ${(p) => p.underlineOnHover && "underline"};
	}
`;

type SeparatorProps = {};
const Separator = styled.span<SeparatorProps>`
	::before {
		content: "-";
		${tw`px-1`}
	}
`;

export default PostHeader;
