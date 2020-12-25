import dayjs from "dayjs";
import React, { forwardRef, ReactElement } from "react";
import tw, { styled, theme } from "twin.macro";

import { FORMAT_CONSTANTS } from "@src/assets/constants/StyleConstants";
import { useQueryPaginationItems } from "@src/hooks";
import { RecentPostModel } from "@src/model/sanity";
import { blocksToText, calculateReadingMinutes } from "@src/utils";

import Broken from "../Broken";
import Pagination from "../Pagination";
import { Post } from "../Post";
import Link from "next/link";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { recentPostsVariants } from "@src/assets/variants";

type RecentPostSetProps = {
	posts: RecentPostProps["data"][];
	numberOfPages: number;
	imageSizes: RecentPostProps["imageSizes"];
};

type RecentPostProps = {
	data: RecentPostModel;
	isMain: boolean;
	imageSizes: {
		default: string;
		main: string;
	};
};

function RecentPostSet({
	posts,
	imageSizes,
	numberOfPages,
}: RecentPostSetProps): ReactElement {
	const onPaginationItemClicked = () => {
		setTimeout(() => {
			document.getElementById("recent-posts-header")?.scrollIntoView();
		}, 300); // This is not because posts aren't loaded, just for some weird reason.
	};

	const { items } = useQueryPaginationItems({ count: numberOfPages });

	return (
		<Container>
			{posts.length === 0 && (
				<Broken height="10rem" errorText="Wow, such empty, much space" />
			)}
			<AnimatePresence>
				<RecentPostSetContainer
					variants={recentPostsVariants.postSet}
					initial="hidden"
					animate="visible"
					exit="exit"
					key={posts[0].slug}
				>
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
			</AnimatePresence>

			<Pagination items={items} onItemClicked={onPaginationItemClicked} />
		</Container>
	);
}

type Ref = HTMLElement;
export const RecentPost = forwardRef<Ref, RecentPostProps>(
	({ data, isMain, imageSizes }, articleRef): ReactElement => {
		const {
			category,
			slug,
			thumbnail,
			title,
			publishedAt,
			snippet,
			body,
		} = data;
		const linkToPost = "/" + slug;

		return (
			<RecentPostContainer
				ref={articleRef}
				variants={recentPostsVariants.post}
				key={slug}
			>
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
						&nbsp;&nbsp;-&nbsp;&nbsp;
						{calculateReadingMinutes(blocksToText(body))}
					</SubInfo>
					{isMain && (
						<>
							<Snippet>{snippet}</Snippet>
							<Link href={"/" + slug} passHref>
								<ReadMoreButton>Read more</ReadMoreButton>
							</Link>
						</>
					)}
				</InfoContainer>
			</RecentPostContainer>
		);
	}
);

type ContainerProps = {};
const Container = styled.div<ContainerProps>``;

type RecentPostSetContainerProps = {};
const RecentPostSetContainer = styled(motion.ul)<RecentPostSetContainerProps>`
	${tw`mb-10`}
	display: grid;

	gap: 3rem 1.5rem;

	@media screen and (min-width: ${theme`screens.mdTablet`}) {
		grid-template-columns: 1fr 1fr;
	}
`;

type RecentPostContainerProps = {};
const RecentPostContainer = styled(motion.article)<RecentPostContainerProps>``;

const { Category, Title, Thumbnail, SubInfo, Snippet, InfoContainer } = Post;

type ReadMoreButtonProps = {};
const ReadMoreButton = styled.a<ReadMoreButtonProps>`
	${tw`capitalize border-b-2 border-solid border-accent inline-block`}

	transition: color 200ms ease, border-color 200ms ease;

	:hover,
	:focus {
		${tw`text-accent border-transparent`}
	}
`;

export default RecentPostSet;
