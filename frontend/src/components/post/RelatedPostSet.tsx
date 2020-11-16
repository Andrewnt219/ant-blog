import { FORMAT_CONSTANTS } from "@src/assets/constants/StyleConstants";
import { Post } from "@src/components/Post";
import { RelatedPostsProps } from "@src/service/sanityDataService";
import dayjs from "dayjs";
import React, { ReactElement } from "react";
import tw, { styled } from "twin.macro";

type RelatedPostSetProps = {
	posts: RelatedPostsProps[];
};

function RelatedPostSet({ posts }: RelatedPostSetProps): ReactElement {
	return (
		<PostSetContainer>
			{posts.map((post) => (
				<li key={post._id}>
					<RelatedPost data={post} />
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
	data: RelatedPostsProps;
};

function RelatedPost({ data }: Props): ReactElement {
	const { slug, publishedAt, image, title } = data;

	const linkToPost = `/${slug}`;

	return (
		<PostContainer>
			<Post.Thumbnail data={{ linkToPost, image }} />
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
