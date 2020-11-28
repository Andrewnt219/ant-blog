import { FORMAT_CONSTANTS } from "@src/assets/constants/StyleConstants";
import { blocksToText, calculateReadingMinutes } from "@src/utils";
import dayjs from "dayjs";
import React, { ReactElement } from "react";
import tw, { styled } from "twin.macro";
import { Post } from "../Post";

type RecentPostSetProps = {
	posts: RecentPostProps["data"][];
};

type RecentPostProps = {
	data: {
		category: {
			title: string;
			slug: string;
		};
		image: {
			url: string;
			alt?: string;
		};
		slug: string;
		title: string;
		publishedAt: string;
		snippet: string;
		body: any;
	};
	isMain: boolean;
};

function RecentPostSet({ posts }: RecentPostSetProps): ReactElement {
	return (
		<RecentPostSetContainer>
			{posts.map((post, index) => (
				<li
					key={post.slug}
					style={{ gridColumn: index === 0 ? "1/-1" : undefined }}
				>
					<RecentPost data={post} isMain={index === 0} />
				</li>
			))}
		</RecentPostSetContainer>
	);
}

export function RecentPost({ data, isMain }: RecentPostProps): ReactElement {
	const { category, slug, image, title, publishedAt, snippet, body } = data;
	const linkToPost = "/" + slug;

	return (
		<RecentPostContainer>
			<Thumbnail data={{ linkToPost, image }} />
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
	grid-template-columns: 1fr 1fr;
	gap: 3rem 1.5rem;
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
