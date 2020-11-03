import { calculateReadingMinutes } from "@src/utils";
import dayjs from "dayjs";
import React, { ReactElement } from "react";
import tw, { css, styled } from "twin.macro";
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
		rawContent: string;
		snippet: string;
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

function RecentPost({ data, isMain }: RecentPostProps): ReactElement {
	const {
		category,
		slug,
		image,
		title,
		publishedAt,
		rawContent,
		snippet,
	} = data;
	const linkToPost = "/" + slug;

	return (
		<RecentPostContainer>
			<Thumbnail data={{ linkToPost, image }} />

			<Category data={category} />
			<Title data={{ linkToPost, title }} />
			<SubInfo isTime>{dayjs(publishedAt).format("MMM DD YYYY")}</SubInfo>
			<SubInfo>
				&nbsp;&nbsp;-&nbsp;&nbsp;{calculateReadingMinutes(rawContent)}
			</SubInfo>
			{isMain && (
				<>
					<Snippet>{snippet}</Snippet>
					<button>Read more</button>
				</>
			)}
		</RecentPostContainer>
	);
}

type RecentPostSetContainerProps = {};
const RecentPostSetContainer = styled.ul<RecentPostSetContainerProps>`
	display: grid;
	grid-template-columns: 1fr 1fr;
`;

type RecentPostContainerProps = {};
const RecentPostContainer = styled.article<RecentPostContainerProps>``;

const { Category, Title, Thumbnail, SubInfo, SubInfoContainer, Snippet } = Post;

export default RecentPostSet;
