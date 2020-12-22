import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import tw, { styled } from 'twin.macro';

import { ENDPOINTS } from '@src/assets/constants/StyleConstants';
import { CategoryModel } from '@src/model/sanity';
import { lqipBackground } from '@src/utils';

type CategorySideBarProps = {
	data: CategoryProps["data"][];
};

function CategorySideBar({ data }: CategorySideBarProps): ReactElement {
	return (
		<Container>
			<Title>Featured categories</Title>

			<CategorySetContainer>
				{data.map((category) => (
					<li key={category.slug}>
						<Category data={category} />
					</li>
				))}
				<li>
					<Link href={ENDPOINTS.category} passHref>
						<SeeAllLink>
							All categories <FaArrowRight />
						</SeeAllLink>
					</Link>
				</li>
			</CategorySetContainer>
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.aside<ContainerProps>``;

type Title = {};
const Title = styled.h5<Title>`
	${tw`border-b border-solid border-borderColor mb-8 pb-2`}
	font-size: larger;
`;

type CategorySetContainerProps = {};
const CategorySetContainer = styled.ul<CategorySetContainerProps>`
	${tw`space-y-2`}
`;

type SeeAllLinkProps = {};
const SeeAllLink = styled.a<SeeAllLinkProps>`
	${tw`flex items-center justify-center mt-5`}
	${tw`underline font-500 text-right`}

	text-decoration-color: transparent;
	transition: text-decoration-color 200ms ease;

	svg {
		${tw`ml-1`}
		transition: transform 200ms ease;
	}

	:hover,
	:focus {
		text-decoration-color: currentColor;
		svg {
			transform: translateX(0.3rem);
		}
	}
`;

/* -------------------------------------------------------------------------- */
/*                                  CATEGORY                                  */
/* -------------------------------------------------------------------------- */

type CategoryProps = {
	data: CategoryModel;
};

function Category({ data }: CategoryProps) {
	const { slug, thumbnail, title } = data;
	return (
		<CategoryContainer>
			<Link href={`${ENDPOINTS.category}/${slug}`} passHref>
				<CategoryTitle>{title}</CategoryTitle>
			</Link>

			<Thumbnail lqip={thumbnail.metadata.lqip}>
				<Image src={thumbnail.url} unsized sizes=", 24vw" quality={50} />
			</Thumbnail>
		</CategoryContainer>
	);
}
type CategoryContainerProps = {};
const CategoryContainer = styled.article<CategoryContainerProps>`
	${tw`h-16 relative rounded-sm overflow-hidden`}
	${tw`font-500 text-white`}
	font-size: smaller;

	transition: transform 150ms ease;

	:hover,
	:focus-within {
		transform: translateX(1rem);
	}
`;

type CategoryTitleProps = {};
const CategoryTitle = styled.a<CategoryTitleProps>`
	${tw`relative z-10`}
	${tw`flex items-center`}
	${tw` h-full w-full pl-5`}
	background: rgba(0, 0, 0, 0.7);
`;

type ThumbnailProps = {
	lqip: string;
};
const Thumbnail = styled.div<ThumbnailProps>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	img {
		object-fit: cover;
		${(p) => lqipBackground(p.lqip)}
	}

	div,
	img {
		width: 100%;
		height: 100%;
	}
`;

export default CategorySideBar;
