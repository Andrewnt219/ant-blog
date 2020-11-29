import React, { ReactElement, useMemo } from "react";
import tw, { styled, theme } from "twin.macro";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { PostReactionSet } from "./PostReactionSet";
import CenteredElementWithLine from "../CenteredElementWithLine";
import { ENDPOINTS } from "@src/assets/constants/StyleConstants";
import { ImageModel } from "@src/model/sanity";
import { lqipBackground } from "@src/utils/cssHelpers";
import { createSrcSet } from "@src/utils";

type Props = {
	data: {
		categories: {
			title: string;
			slug: string;
		}[];

		author: {
			avatar: ImageModel;
			name: string;
			bio: string;
			slug: string;
		};
	};

	className?: string;
};

function PostFooter({ data, className }: Props): ReactElement {
	const { categories, author } = data;

	const srcset = useMemo(
		() => createSrcSet(author.avatar.url, { format: "webp" }),
		[author.avatar.url]
	);

	return (
		// TODO add margin-top in case post does not end with a paragraph
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
					<AuthorImageContainer lqip={author.avatar.metadata.lqip}>
						<img
							sizes=", 7vw"
							src={author.avatar.url}
							srcSet={srcset}
							alt={author.name + " avatar"}
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
	align-items: flex-start;
	gap: 1rem;

	@media screen and (min-width: ${theme`screens.smDesktop`}) {
		gap: 2rem;
		grid-template-columns: 1fr auto;
	}
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

type AuthorImageContainerProps = {
	lqip: string;
};
const AuthorImageContainer = styled.div<AuthorImageContainerProps>`
	${tw`w-24 h-24 rounded-full overflow-hidden`}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;

		${(p) => lqipBackground(p.lqip)}
	}
`;

type AuthorNameProps = {};
const AuthorName = styled.a<AuthorNameProps>`
	${tw`text-xl font-600`}
`;

type AuthorBioProps = {};
const AuthorBio = styled.p<AuthorBioProps>`
	${tw`text-center`}
`;

export default PostFooter;
