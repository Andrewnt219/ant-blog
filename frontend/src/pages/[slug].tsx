import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React, { useEffect } from "react";

import { SanityDataService } from "@src/service/sanity/sanity.data-service";
import { PostPageContent } from "@src/model/PostPageContent";
import { useRouter } from "next/router";
import Loading from "@src/components/Loading";
import PostPage from "@src/components/page/PostPage";
import NProgress from "nprogress";

// TODO add view count and react count to firebase
// TODO: router.fallback
const Post = ({
	prefetchedContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const { isFallback } = useRouter();

	useEffect(() => {
		if (isFallback) NProgress.start();

		NProgress.done();
	}, [isFallback]);

	if (isFallback) {
		return <Loading height="25rem" />;
	}

	return <PostPage content={prefetchedContent} />;
};

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
