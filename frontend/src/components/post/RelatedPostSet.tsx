import { FORMAT_CONSTANTS } from "@src/assets/constants/StyleConstants";
import { Post } from "@src/components/Post";
import { RelatedPostsModel } from "@src/model/sanity/RelatedPostModel";
import dayjs from "dayjs";
import React, { ReactElement } from "react";
import tw, { styled } from "twin.macro";

type RelatedPostSetProps = {
	posts: RelatedPostsModel[];
	imageSizes: Props["imageSizes"];
};

function RelatedPostSet({
	posts,
	imageSizes,
}: RelatedPostSetProps): ReactElement {
	return (
		<PostSetContainer>
			{posts.map((post) => (
				<li key={post._id}>
					<RelatedPost imageSizes={imageSizes} data={post} />
				</li>
			))}
		</PostSetContainer>
	);
}

type PostSetContainerProps = {};
const PostSetContainer = styled.ul<PostSetContainerProps>`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 3rem 1.5rem;
`;

type Props = {
	data: RelatedPostsModel;
	imageSizes: string;
};

function RelatedPost({ data, imageSizes }: Props): ReactElement {
	const { slug, publishedAt, image, title } = data;

	const linkToPost = `/${slug}`;

	return (
		<PostContainer>
			<Post.Thumbnail sizes={imageSizes} data={{ linkToPost, image }} />
			<Post.InfoContainer>
				<CustomPostTitle data={{ linkToPost, title }} />
				<Post.SubInfoContainer>
					<Post.SubInfo isTime>
						{dayjs(publishedAt).format(FORMAT_CONSTANTS.dateFormat)}
					</Post.SubInfo>
				</Post.SubInfoContainer>
			</Post.InfoContainer>
		</PostContainer>
	);
}

type PostContainerProps = {};
const PostContainer = styled.article<PostContainerProps>``;

const CustomPostTitle = styled(Post.Title)`
	${tw`font-600`}
`;

export default RelatedPostSet;
