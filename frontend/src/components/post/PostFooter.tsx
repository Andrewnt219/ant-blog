import React, { ReactElement } from "react";
import tw, { styled } from "twin.macro";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { PostReactionSet } from "./PostReactionSet";
import CenteredElementWithLine from "../CenteredElementWithLine";
import Image from "next/image";
import { ENDPOINTS } from "@src/assets/constants/StyleConstants";

type Props = {
	data: {
		categories: {
			title: string;
			slug: string;
		}[];

		author: {
			avatarSrc: string;
			name: string;
			bio: string;
			slug: string;
		};
	};

	className?: string;
};

function PostFooter({ data, className }: Props): ReactElement {
	const { categories, author } = data;

	return (
		<Footer className={className}>
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
	);
}

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

export default PostFooter;
