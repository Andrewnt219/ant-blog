import dayjs from "dayjs";
import React, { ReactElement } from "react";
import tw, { styled } from "twin.macro";
import { Post } from "../Post";

type SidePostSetProps = {
	posts: SidePostProps["data"][];
};

type SidePostProps = {
	data: {
		title: string;
		slug: string;
		publishedAt: string;
		image: {
			url: string;
			alt?: string;
		};
	};
};

function SidePostSet({ posts }: SidePostSetProps): ReactElement {
	return (
		<SidePostSetContainer>
			{posts.map((post) => (
				<li key={post.slug}>
					<SidePost data={post} />
				</li>
			))}
		</SidePostSetContainer>
	);
}

function SidePost({ data }: SidePostProps): ReactElement {
	const { title, slug, publishedAt, image } = data;

	const linkToPost = "/" + slug;

	return (
		<SidePostContainer>
			<Thumbnail data={{ image, linkToPost }} />
			<CustomInfoContainer>
				<CustomTitle data={{ title, linkToPost }} />
				<SubInfo isTime>{dayjs(publishedAt).format("MMM dd YYYY")}</SubInfo>
			</CustomInfoContainer>
		</SidePostContainer>
	);
}

type SidePostSetContainerProps = {};
const SidePostSetContainer = styled.ul<SidePostSetContainerProps>`
	${tw`flex flex-col space-y-5`}
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
