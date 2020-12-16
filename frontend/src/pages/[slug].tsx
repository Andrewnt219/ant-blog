import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React, { useMemo } from "react";
import tw, { styled, theme } from "twin.macro";

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

// TODO add view count and react count to firebase
// TODO: router.fallback
const Post = ({
	post,
	sidePosts: initialSidePosts,
	relatedPosts: initialRelatedPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	/* --------------------------------- STATES --------------------------------- */
	// Post's comments
	const comments = usePostComments(post._id);

	// Full location to current page
	const currentLocation = useCurrentLocation();

	const { data: sidePosts, error: sidePostsError } = useSidePosts(
		initialSidePosts
	);

	const { data: relatedPosts, error: relatedPostsError } = useRelatedPosts({
		post,
		initialRelatedPosts,
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
		() => createSrcSet(post.thumbnail.url, { format: "webp", quality: 50 }),
		[post.thumbnail.url]
	);

	useIncreasePostViews(post._id);

	return (
		<>
			<Head>
				<title>{post.title}</title>

				<link
					rel="preload"
					as="image"
					href={post.thumbnail.url}
					// @ts-ignore
					imagesrcset={heroSrcSet}
				/>
			</Head>

			<PostHeader
				data={{
					...post,
					category: post.categories.main,
					readMinute: calculateReadingMinutes(blocksToText(post.body)),
				}}
				srcset={heroSrcSet}
			/>
			<SidebarLayout>
				<ShareSideBar sharingUrl={currentLocation?.href ?? ""} />
				<PostBody data={post} />
				{renderedSidePosts}
			</SidebarLayout>

			<SidebarLayout>
				<PostFooter data={post} />

				<CommentSet _postId={post._id} comments={comments} />

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
	post: PostModel;
	sidePosts: SidePostModel[];
	relatedPosts: RelatedPostsModel[];
};

type Params = {
	slug: string;
};

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
	params,
}) => {
	const post = await SanityDataService.getInstance().getPost(params!.slug);

	const relatedPosts = await SanityDataService.getInstance().getRelatedPosts(
		post.categories.main.slug,
		post._id
	);

	const sidePosts = await SanityDataService.getInstance().getSidePosts();

	return {
		props: { post, sidePosts, relatedPosts },
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
		fallback: false,
	};
};
