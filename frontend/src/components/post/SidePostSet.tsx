import dayjs from 'dayjs';
import React, { ReactElement } from 'react';
import tw, { styled } from 'twin.macro';

import { FORMAT_CONSTANTS } from '@src/assets/constants/StyleConstants';
import { SidePostModel } from '@src/model/sanity/SidePostModel';

import { Post } from '../Post';

type SidePostSetProps = {
	posts: SidePostModel[];
	title: string;
	imageSizes: SidePostProps["imageSizes"];
};

type SidePostProps = {
	data: SidePostModel;
	imageSizes: string;
};

function SidePostSet({
	posts,
	title,
	imageSizes,
}: SidePostSetProps): ReactElement {
	return (
		<Container>
			<PostSetTitle>{title}</PostSetTitle>

			<SidePostSetContainer>
				{posts.map((post) => (
					<li key={post.slug}>
						<SidePost data={post} imageSizes={imageSizes} />
					</li>
				))}
			</SidePostSetContainer>
		</Container>
	);
}

function SidePost({ data, imageSizes }: SidePostProps): ReactElement {
	const { title, slug, publishedAt, thumbnail } = data;

	const linkToPost = "/" + slug;

	return (
		<SidePostContainer>
			<Thumbnail sizes={imageSizes} data={{ thumbnail, linkToPost }} />
			<CustomInfoContainer>
				<CustomTitle data={{ title, linkToPost }} />
				<SubInfo isTime>
					{dayjs(publishedAt).format(FORMAT_CONSTANTS.dateFormat)}
				</SubInfo>
			</CustomInfoContainer>
		</SidePostContainer>
	);
}

type ContainerProps = {};
const Container = styled.aside<ContainerProps>``;

type PostSetTitleProps = {};
const PostSetTitle = styled.h5<PostSetTitleProps>`
	${tw`border-b border-solid border-borderColor mb-8 pb-2 text-lg`}
`;

type SidePostSetContainerProps = {};
const SidePostSetContainer = styled.ul<SidePostSetContainerProps>`
	${tw`flex flex-col space-y-6`}
`;

type SidePostContainerProps = {};
const SidePostContainer = styled.article<SidePostContainerProps>`
	display: grid;
	grid-template-columns: 40% 1fr;
	gap: 1em;
	align-items: flex-start;
`;

const { Thumbnail, Title, SubInfo, InfoContainer } = Post;

const CustomTitle = styled(Title)`
	${tw`text-sm font-500`}
`;

const CustomInfoContainer = styled(InfoContainer)`
	margin: 0;
	width: 100%;
	${tw`text-xs`}
`;

export default SidePostSet;
