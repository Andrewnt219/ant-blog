import { STYLE_CONSTANTS } from '@src/assets/constants/StyleConstants';
import CenteredElementWithLine from '@src/components/CenteredElementWithLine';
import CommentSet from '@src/components/post/CommentSet';
import PostBody from '@src/components/post/PostBody';
import PostFooter from '@src/components/post/PostFooter';
import PostHeader from '@src/components/post/PostHeader';
import RelatedPostSet from '@src/components/post/RelatedPostSet';
import SidePostSet from '@src/components/post/SidePostSet';
import ShareSideBar from '@src/components/ShareSideBar';
import {
  useCurrentLocation,
  usePostComments,
  useRelatedPosts,
  useSidePosts,
} from '@src/hooks';
import { useIncreasePostViews } from '@src/hooks/useIncreasePostViews';
import SidebarLayout from '@src/layouts/SidebarLayout';
import { PostPageContent } from '@src/model/PostPageContent';
import {
  blocksToText,
  calculateReadingMinutes,
  createSrcSet,
  renderPosts,
} from '@src/utils';
import Head from 'next/head';
import React, { useMemo } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
  content: PostPageContent;
};
const PostPage = ({ content }: Props) => {
  /* --------------------------------- STATES --------------------------------- */
  // Post's comments
  const comments = usePostComments(content.post._id);

  // Full location to current page
  const currentLocation = useCurrentLocation();

  const { data: sidePosts, error: sidePostsError } = useSidePosts(
    content.sidePosts
  );

  const { data: relatedPosts, error: relatedPostsError } = useRelatedPosts({
    post: content.post,
    initialRelatedPosts: content.relatedPosts,
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
      createSrcSet(content.post.thumbnail.url, {
        format: 'webp',
        quality: 50,
      }),
    [content.post.thumbnail.url]
  );

  useIncreasePostViews(content.post._id);

  return (
    <>
      <Head>
        <title>{content.post.title}</title>

        <link
          rel="preload"
          as="image"
          href={content.post.thumbnail.url}
          // @ts-ignore
          imagesrcset={heroSrcSet}
        />
      </Head>

      <PostHeader
        data={{
          ...content.post,
          category: content.post.categories.main,
          readMinute: calculateReadingMinutes(blocksToText(content.post.body)),
        }}
        srcset={heroSrcSet}
      />
      <SidebarLayout>
        <ShareSideBar sharingUrl={currentLocation?.href ?? ''} />
        <PostBody data={content.post} />
        {renderedSidePosts}
      </SidebarLayout>

      <SidebarLayout>
        <PostFooter
          data={content.post}
          shareUrl={currentLocation?.href ?? ''}
        />

        <CommentSet _postId={content.post._id} comments={comments} />

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
export default PostPage;
