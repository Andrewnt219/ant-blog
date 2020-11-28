import { FORMAT_CONSTANTS } from "@src/assets/constants/StyleConstants";
import { blocksToText, calculateReadingMinutes } from "@src/utils";
import dayjs from "dayjs";
import React, { ReactElement } from "react";
import tw, { styled, theme } from "twin.macro";
import { Post } from "../Post";
import SocialMediaIcon from "../SocialMediaIcon";

type PostPreviewSetProps = {
	posts: PostPreviewProps["data"][];
};

type PostPreviewProps = {
	data: {
		category: {
			title: string;
			slug: string;
		};
		image: {
			url: string;
			alt?: string;
		};
		title: string;
		publishedAt: string;
		snippet: string;
		slug: string;
		body: any;
	};
};

function PostPreviewSet({ posts }: PostPreviewSetProps) {
	return (
		<PostPreviewSetContainer>
			{posts.map((post) => (
				<li key={post.slug}>
					<PostPreview data={post} />
				</li>
			))}
		</PostPreviewSetContainer>
	);
}

function PostPreview({ data }: PostPreviewProps): ReactElement {
	const { body, category, title, publishedAt, slug, snippet, image } = data;

	const linkToPost = "/" + slug;

	return (
		<PostPreviewContainer>
			<Thumbnail data={{ linkToPost, image }} />

			<CustomInfoContainer>
				<Category data={category} />

				<Title data={{ title, linkToPost }} />
				<SubInfoContainer>
					<SubInfo isTime>
						{dayjs(publishedAt).format(FORMAT_CONSTANTS.dateFormat)}
					</SubInfo>

					<SubInfo>
						&nbsp;&nbsp;-&nbsp;&nbsp;
						{calculateReadingMinutes(blocksToText(body))}
					</SubInfo>
				</SubInfoContainer>

				<Snippet>{snippet}</Snippet>

				<Footer>
					<SocialMediaSet>
						<li>
							<SocialMediaIcon variants="facebook" />
						</li>

						<li>
							<SocialMediaIcon variants="instagram" />
						</li>
					</SocialMediaSet>
				</Footer>
			</CustomInfoContainer>
		</PostPreviewContainer>
	);
}

type PostPreviewSetContainerProps = {};
const PostPreviewSetContainer = styled.ul<PostPreviewSetContainerProps>`
	display: grid;
	gap: 3rem 1.5rem;

	@media screen and (min-width: ${theme`screens.smTablet`}) {
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
	}
`;

type PostPreviewContainerProps = {};
const PostPreviewContainer = styled.article<PostPreviewContainerProps>`
	height: 100%;

	${tw`flex flex-col`}
`;

const {
	Category,
	Title,
	SubInfo,
	InfoContainer,
	SubInfoContainer,
	Snippet,
	Thumbnail,
} = Post;

const CustomInfoContainer = styled(InfoContainer)`
	padding-bottom: 5rem;
`;

type FooterProps = {};
const Footer = styled.footer<FooterProps>`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
`;

type SocialMediaSetProps = {};
const SocialMediaSet = styled.ul<SocialMediaSetProps>`
	font-size: smaller;
	${tw`mt-5 flex items-center justify-center border-t border-lborderColor border-b border-solid p-3 space-x-3`}
`;

export default PostPreviewSet;
