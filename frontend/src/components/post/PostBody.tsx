import BlockContent from "@sanity/block-content-to-react";
import React, { ReactElement, useEffect, useState } from "react";
import tw, { styled } from "twin.macro";
import sanityClient from "@src/lib/sanity/client";
import { postSerializer } from "@src/lib/sanity/serializers/postSerializer";
import ShareSideBar from "../ShareSideBar";
import Breadcrumb from "../Breadcrumb";
import { useRouter } from "next/router";
import SidePostSet from "./SidePostSet";
import useSWR from "swr";
import { sanityFetcher } from "@src/lib/swr";
import { SanityClientErrorResponse } from "sanity";
import Loading from "../Loading";
import Broken from "../Broken";

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
	image: {
		url: string;
		alt?: string;
	};
};

function PostBody({ data }: Props): ReactElement {
	const { body, category, title } = data;
	const [currentLocation, setCurrentLocation] = useState<string>("");
	const { asPath } = useRouter();

	const { data: sidePosts, error } = useSWR<
		SidePostProps[],
		SanityClientErrorResponse
	>(
		`
		*[_type == "post" && !isArchived && !isPinned] | order(_updatedAt desc) {
			title,
			"slug": slug.current,
			publishedAt,
			"category": categories[] -> {title, "slug": slug.current}[0],
			"image": mainImage {
				alt,
				"url": asset -> url
			}
		}[0...3]
	`,
		sanityFetcher
	);

	let renderedSidePosts = (
		<Loading height="10rem" loadingText="Fetching posts..." />
	);

	if (error) {
		renderedSidePosts = (
			<Broken errorText="Fail to fetch posts :(" height="10rem" />
		);
	}

	if (sidePosts) {
		renderedSidePosts = <SidePostSet posts={sidePosts} title="Latest Post" />;
	}

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
			<Header>
				<ShareSideBar sharingUrl={currentLocation} />
			</Header>

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

			{renderedSidePosts}
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

type MainProps = {};
const Main = styled.div<MainProps>``;

type FooterProps = {};
const Footer = styled.footer<FooterProps>``;

export default PostBody;
