import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React, { useMemo } from "react";
import tw, { styled } from "twin.macro";

import { STYLE_CONSTANTS } from "@src/assets/constants/StyleConstants";
import CenteredElementWithLine from "@src/components/CenteredElementWithLine";
import CommentSet from "@src/components/post/CommentSet";
import PostBody from "@src/components/post/PostBody";
import PostFooter from "@src/components/post/PostFooter";
import PostHeader from "@src/components/post/PostHeader";
import RelatedPostSet from "@src/components/post/RelatedPostSet";
import SidePostSet from "@src/components/post/SidePostSet";
import ShareSideBar from "@src/components/ShareSideBar";
import {
	useCurrentLocation,
	usePostComments,
	useRelatedPosts,
	useSidePosts,
} from "@src/hooks";
import { PostModel } from "@src/model/sanity";
import { RelatedPostsModel } from "@src/model/sanity/RelatedPostModel";
import { SidePostModel } from "@src/model/sanity/SidePostModel";
import { SanityDataService } from "@src/service/sanity/sanity.data-service";
import {
	blocksToText,
	calculateReadingMinutes,
	createSrcSet,
	renderPosts,
} from "@src/utils";
import SidebarLayout from "@src/layouts/SidebarLayout";
import { useIncreasePostViews } from "@src/hooks/useIncreasePostViews";
import { useRouter } from "next/router";
import { PostPageContent } from "@src/model/PostPageContent";

// TODO add view count and react count to firebase
// TODO: router.fallback
const Post = ({
	prefetchedContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	/* --------------------------------- STATES --------------------------------- */
	// Post's comments
	const comments = usePostComments(prefetchedContent.post._id);

	// Full location to current page
	const currentLocation = useCurrentLocation();

	const { data: sidePosts, error: sidePostsError } = useSidePosts(
		prefetchedContent.sidePosts
	);

	const { data: relatedPosts, error: relatedPostsError } = useRelatedPosts({
		post: prefetchedContent.post,
		initialRelatedPosts: prefetchedContent.relatedPosts,
	});

	/* --------------------------------- RENDER --------------------------------- */

	const renderedSidePosts = renderPosts(
		sidePosts,
		sidePostsError,
		<SidePostSet
			imageSizes={STYLE_CONSTANTS.sidePostsSizes}
			posts={sidePosts!}
			title="Lastest Posts"
		/>
	);

	const renderedRelatedPosts = renderPosts(
		relatedPosts,
		relatedPostsError,
		<RelatedPostSet
			imageSizes="(min-width: 1280px) 21.86vw, (min-width: 780px) 45vw, 90vw"
			posts={relatedPosts!}
		/>
	);

	const heroSrcSet = useMemo(
		() =>
			createSrcSet(prefetchedContent.post.thumbnail.url, {
				format: "webp",
				quality: 50,
			}),
		[prefetchedContent.post.thumbnail.url]
	);

	useIncreasePostViews(prefetchedContent.post._id);

	return (
		<>
			<Head>
				<title>{prefetchedContent.post.title}</title>

				<link
					rel="preload"
					as="image"
					href={prefetchedContent.post.thumbnail.url}
					// @ts-ignore
					imagesrcset={heroSrcSet}
				/>
			</Head>

			<PostHeader
				data={{
					...prefetchedContent.post,
					category: prefetchedContent.post.categories.main,
					readMinute: calculateReadingMinutes(
						blocksToText(prefetchedContent.post.body)
					),
				}}
				srcset={heroSrcSet}
			/>
			<SidebarLayout>
				<ShareSideBar sharingUrl={currentLocation?.href ?? ""} />
				<PostBody data={prefetchedContent.post} />
				{renderedSidePosts}
			</SidebarLayout>

			<SidebarLayout>
				<PostFooter data={prefetchedContent.post} />

				<CommentSet _postId={prefetchedContent.post._id} comments={comments} />

				{relatedPosts && relatedPosts.length > 0 && (
					<>
						<CenteredElementWithLine>
							<Title>Related posts</Title>
						</CenteredElementWithLine>
						{renderedRelatedPosts}
					</>
				)}
			</SidebarLayout>
		</>
	);
};

type TitleProps = {};
const Title = styled.span<TitleProps>`
	${tw`text-xl font-600`}
`;

export default Post;

/* -------------------------------------------------------------------------- */
/*                                 SERVER-SIDE                                */
/* -------------------------------------------------------------------------- */
type StaticProps = {
	prefetchedContent: PostPageContent;
};

type Params = {
	slug: string;
};

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
	params,
}) => {
	const prefetchedContent = await SanityDataService.getInstance().getPostPageContent(
		params!.slug
	);

	return {
		props: { prefetchedContent },
		revalidate: 1,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const postSlugSet = await SanityDataService.getInstance().getPostsSlug();

	const paths = postSlugSet.map((post) => ({
		params: { slug: post.slug.current },
	}));

	return {
		paths,
		fallback: true,
	};
};
