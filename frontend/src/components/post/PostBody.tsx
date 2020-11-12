import BlockContent from "@sanity/block-content-to-react";
import React, { ReactElement, useEffect, useState } from "react";
import tw, { styled } from "twin.macro";
import sanityClient from "@src/lib/sanity/client";
import { postSerializer } from "@src/lib/sanity/serializers/postSerializer";
import ShareSideBar from "../ShareSideBar";
import Breadcrumb from "../Breadcrumb";
import { useRouter } from "next/router";
import SidePostSet, { SidePostSetProps } from "./SidePostSet";
import useSWR from "swr";
import { sanityFetcher } from "@src/lib/swr";
import { SanityClientErrorResponse } from "sanity";
import Loading from "../Loading";
import Broken from "../Broken";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { ENDPOINTS } from "@src/assets/constants/StyleConstants";
import { PostReactionSet } from "./PostReactionSet";
import CenteredElementWithLine from "../CenteredElementWithLine";
import Image from "next/image";

type Props = {
	data: {
		categories: {
			title: string;
			slug: string;
		}[];
		title: string;
		body: any;
		author: {
			avatarSrc: string;
			bio: any;
			name: string;
			socialMedias?: string[];
			slug: string;
		};
	};
};

type a = {
	name?: { first: string };
};

function PostBody({ data }: Props): ReactElement {
	const { body, categories, title, author } = data;
	const [currentLocation, setCurrentLocation] = useState<string>("");
	const { asPath } = useRouter();

	const { data: sidePosts, error } = useSWR<
		SidePostSetProps["posts"],
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
			text: categories[0].title,
			href: `${ENDPOINTS.category}/${categories[0].slug}`,
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
				<header>
					<Breadcrumb data={breadcrumbItems} />
				</header>

				<main>
					<BlockContent
						blocks={body}
						projectId={sanityClient.config().projectId}
						dataset={sanityClient.config().dataset}
						serializers={postSerializer}
						imageOptions={{ fit: "clip", auto: "format" }}
					/>
				</main>

				{/* TODO move out of PostBody to [slug] because of SharingSideBar range */}
				<Footer>
					<AdditionalInfo>
						<CategorySet>
							{categories
								.sort((a, b) => a.title.localeCompare(b.title))
								.map((category) => (
									<Category key={category.slug}>
										<Link href={`${ENDPOINTS.category}/${category.slug}`}>
											<a>{category.title}</a>
										</Link>
									</Category>
								))}
						</CategorySet>
						<ShareButtonSet>
							{[FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, index) => (
								<li key={index}>
									<ShareButton>
										<Icon />
									</ShareButton>
								</li>
							))}
						</ShareButtonSet>
					</AdditionalInfo>
					<PostReactionSet itemHeight="3rem" />

					<AuthorContainer>
						<CenteredElementWithLine>
							<AuthorImageContainer>
								<Image
									src={author.avatarSrc}
									alt={author.name + "avatar"}
									unsized
								/>
							</AuthorImageContainer>
						</CenteredElementWithLine>

						<AuthorInfo>
							<Link href={`${ENDPOINTS.author}/${author.slug}`} passHref>
								<AuthorName>{author.name}</AuthorName>
							</Link>
							<AuthorBio>{author.bio}</AuthorBio>

							{/* TODO: add author's social media */}
							{/* {socialMedias?.map(link => )} */}
						</AuthorInfo>
					</AuthorContainer>

					<RelatedPosts>
						<h2>Related posts</h2>
					</RelatedPosts>
				</Footer>
			</Main>

			{renderedSidePosts}
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

type MainProps = {};
const Main = styled.div<MainProps>``;

type FooterProps = {};
const Footer = styled.footer<FooterProps>`
	${tw`space-y-10`}
`;

type AdditionalInfoProps = {};
const AdditionalInfo = styled.div<AdditionalInfoProps>`
	${tw`text-xs`}
	display: grid;
	grid-template-columns: 1fr auto;
	align-items: flex-start;
	gap: 2rem;
`;

type CategorySetProps = {};
const CategorySet = styled.ul<CategorySetProps>`
	${tw`flex space-x-2 items-center flex-wrap -mt-2`}

	& > * {
		${tw`mt-2`}
	}
`;

type CategoryProps = {};
const Category = styled.li<CategoryProps>`
	${tw`px-4 py-1 border border-solid border-lborderColor uppercase font-500 tracking-widest`}
	${tw`flex items-center justify-center`}
	font-size: smaller;

	transition: color 300ms ease;

	:hover,
	:focus {
		${tw`text-accent`}
	}
`;

type ShareButtonSetProps = {};
const ShareButtonSet = styled.ul<ShareButtonSetProps>`
	${tw`flex items-center space-x-1`}
`;

type ShareButtonProps = {};
const ShareButton = styled.button<ShareButtonProps>`
	${tw`flex items-center justify-center`}
	${tw`border-lborderColor border border-solid rounded-full p-2`}
	font-size: smaller;

	transition: color 300ms ease;

	:hover,
	:focus {
		${tw`text-accent`}
	}
`;

type AuthorContainerProps = {};
const AuthorContainer = styled.div<AuthorContainerProps>`
	/* NOTE this should be the same space-y with authorInfo */
	${tw`space-y-3`}
`;

type AuthorInfoProps = {};
const AuthorInfo = styled.div<AuthorInfoProps>`
	${tw`flex flex-col items-center space-y-3 text-sm`}
`;

type AuthorImageContainerProps = {};
const AuthorImageContainer = styled.div<AuthorImageContainerProps>`
	${tw`w-24 h-24 rounded-full overflow-hidden`}

	div,
	img {
		width: 100%;
		height: 100%;
	}

	img {
		object-fit: cover;
		object-position: center center;
	}
`;

type AuthorNameProps = {};
const AuthorName = styled.a<AuthorNameProps>`
	${tw`text-xl font-700`}
`;

type AuthorBioProps = {};
const AuthorBio = styled.p<AuthorBioProps>`
	${tw`text-center`}
`;

type RelatedPostsProps = {};
const RelatedPosts = styled.div<RelatedPostsProps>``;

export default PostBody;
