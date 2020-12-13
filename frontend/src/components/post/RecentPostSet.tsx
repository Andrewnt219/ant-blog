import dayjs from "dayjs";
import React, { ReactElement } from "react";
import tw, { styled, theme } from "twin.macro";

import { FORMAT_CONSTANTS } from "@src/assets/constants/StyleConstants";
import { HomePostModel } from "@src/model/sanity";
import { blocksToText, calculateReadingMinutes } from "@src/utils";

import { Post } from "../Post";

type RecentPostSetProps = {
	posts: RecentPostProps["data"][];
	imageSizes: RecentPostProps["imageSizes"];
};

type RecentPostProps = {
	data: HomePostModel;
	//  {
	// 	category: {
	// 		title: string;
	// 		slug: string;
	// 	};
	// 	thumbnail: ImageModel;
	// 	slug: string;
	// 	title: string;
	// 	publishedAt: string;
	// 	snippet: string;
	// 	body: any;
	// };
	isMain: boolean;
	imageSizes: {
		default: string;
		main: string;
	};
};

function RecentPostSet({
	posts,
	imageSizes,
}: RecentPostSetProps): ReactElement {
	return (
		<RecentPostSetContainer>
			{posts.map((post, index) => (
				<li
					key={post.slug}
					style={{ gridColumn: index === 0 ? "1/-1" : undefined }}
				>
					<RecentPost
						imageSizes={imageSizes}
						data={post}
						isMain={index === 0}
					/>
				</li>
			))}
		</RecentPostSetContainer>
	);
}

export function RecentPost({
	data,
	isMain,
	imageSizes,
}: RecentPostProps): ReactElement {
	const { category, slug, thumbnail, title, publishedAt, snippet, body } = data;
	const linkToPost = "/" + slug;

	return (
		<RecentPostContainer>
			<Thumbnail
				data={{ linkToPost, thumbnail }}
				sizes={isMain ? imageSizes.main : imageSizes.default}
			/>
			<InfoContainer>
				<Category data={category} />
				<Title data={{ linkToPost, title }} />
				<SubInfo isTime>
					{dayjs(publishedAt).format(FORMAT_CONSTANTS.dateFormat)}
				</SubInfo>
				<SubInfo>
					&nbsp;&nbsp;-&nbsp;&nbsp;{calculateReadingMinutes(blocksToText(body))}
				</SubInfo>
				{isMain && (
					<>
						<Snippet>{snippet}</Snippet>
						<ReadMoreButton>Read more</ReadMoreButton>
					</>
				)}
			</InfoContainer>
		</RecentPostContainer>
	);
}

type RecentPostSetContainerProps = {};
const RecentPostSetContainer = styled.ul<RecentPostSetContainerProps>`
	display: grid;

	gap: 3rem 1.5rem;

	@media screen and (min-width: ${theme`screens.mdTablet`}) {
		grid-template-columns: 1fr 1fr;
	}
`;

type RecentPostContainerProps = {};
const RecentPostContainer = styled.article<RecentPostContainerProps>``;

const { Category, Title, Thumbnail, SubInfo, Snippet, InfoContainer } = Post;

type ReadMoreButtonProps = {};
const ReadMoreButton = styled.button<ReadMoreButtonProps>`
	${tw`capitalize border-b-2 border-solid border-accent`}

	transform: filter 300ms ease;

	:hover,
	:focus {
		filter: grayscale(1);
	}
`;

export default RecentPostSet;
