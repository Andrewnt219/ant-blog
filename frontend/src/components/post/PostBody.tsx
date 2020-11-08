import BlockContent from "@sanity/block-content-to-react";
import React, { ReactElement, useEffect, useState } from "react";
import tw, { styled } from "twin.macro";
import sanityClient from "@src/lib/sanity/client";
import { postSerializer } from "@src/lib/sanity/serializers/postSerializer";
import ShareSideBar from "../ShareSideBar";
import Breadcrumb from "../Breadcrumb";
import { useRouter } from "next/router";

type Props = {
	data: {
		category: {
			title: string;
			slug: string;
		};
		title: string;
		body: any;
		sidePosts: SidePostProps[];
	};
};

type SidePostProps = {
	title: string;
	slug: string;
	publishedAt: string;
	thumbnail: {
		url: string;
		alt?: string;
	};
};

function PostBody({ data }: Props): ReactElement {
	const { body, sidePosts, category, title } = data;
	const [currentLocation, setCurrentLocation] = useState<string>("");
	const { asPath } = useRouter();

	const breadcrumbItems = [
		{
			text: "Home",
			href: "/",
		},
		{
			text: category.title,
			href: "/category/" + category.slug,
		},
		{
			text: title,
			href: asPath,
		},
	];

	useEffect(() => {
		setCurrentLocation(window.location.href);
	}, []);

	return (
		<Container>
			<ShareSideBar sharingUrl={currentLocation} />

			<Main>
				<Breadcrumb data={breadcrumbItems} />

				<BlockContent
					blocks={body}
					projectId={sanityClient.config().projectId}
					dataset={sanityClient.config().dataset}
					serializers={postSerializer}
					imageOptions={{ fit: "clip", auto: "format" }}
				/>
			</Main>
			<RightSideBar>
				{sidePosts.map((post) => (
					<img
						key={post.slug}
						src={post.thumbnail.url}
						alt={post.thumbnail.alt ?? post.title}
					/>
				))}
			</RightSideBar>
			<Footer>{category.title}</Footer>
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	display: grid;
	grid-template-columns: 10% 1fr 25%;
	padding: 0 10% 0 2.5%;
	gap: 0 5%;
`;

type HeaderProps = {};
const Header = styled.header<HeaderProps>``;

type RightSideBarProps = {};
const RightSideBar = styled.aside<RightSideBarProps>``;

type MainProps = {};
const Main = styled.div<MainProps>``;

type FooterProps = {};
const Footer = styled.footer<FooterProps>``;

export default PostBody;
