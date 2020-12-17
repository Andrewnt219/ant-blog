import dayjs from "dayjs";
import React, { ReactElement } from "react";
import tw, { styled, theme } from "twin.macro";

import { FORMAT_CONSTANTS } from "@src/assets/constants/StyleConstants";
import { HomePostModel } from "@src/model/sanity";
import {
	blocksToText,
	calculateReadingMinutes,
	formatQuantityWithUnit,
} from "@src/utils";

import { Post } from "../Post";
import SocialMediaIcon from "../SocialMediaIcon";
import { SocialMedia } from "@src/assets/enums/IconEnum";

type PostPreviewSetProps = {
	posts: PostPreviewProps["data"][];
	imageSizes: PostPreviewProps["imageSizes"];
};

type PostPreviewProps = {
	data: Pick<
		HomePostModel,
		| "category"
		| "thumbnail"
		| "title"
		| "publishedAt"
		| "snippet"
		| "body"
		| "slug"
		| "views"
	>;
	imageSizes: string;
};

function PostPreviewSet({ posts, imageSizes }: PostPreviewSetProps) {
	return (
		<PostPreviewSetContainer>
			{posts.map((post) => (
				<li key={post.slug}>
					<PostPreview data={post} imageSizes={imageSizes} />
				</li>
			))}
		</PostPreviewSetContainer>
	);
}

function PostPreview({ data, imageSizes }: PostPreviewProps): ReactElement {
	const {
		views,
		body,
		category,
		title,
		publishedAt,
		slug,
		snippet,
		thumbnail,
	} = data;

	const linkToPost = "/" + slug;

	return (
		<PostPreviewContainer>
			<Thumbnail data={{ linkToPost, thumbnail }} sizes={imageSizes} />

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
						<ViewCount>
							{formatQuantityWithUnit(views, "view", "views")}
						</ViewCount>
						{[SocialMedia.FACEBOOK, SocialMedia.INSTAGRAM].map((icon) => (
							<li key={icon}>
								<SocialMediaIcon variants={icon} />
							</li>
						))}
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
	${tw`flex items-center justify-center `}
	${tw`border-t border-lborderColor border-b border-solid`}
	${tw`mt-5 p-3 space-x-3`}
`;

type ViewCountProps = {};
const ViewCount = styled.span<ViewCountProps>`
	/* font-size: smaller; */
	${tw`flex items-center font-500 text-ltextColor`}

	// NOTE pr-3 should equal space-x-3 of parent
	${tw`pr-3 border-r border-solid border-borderColor`}
`;

export default PostPreviewSet;
