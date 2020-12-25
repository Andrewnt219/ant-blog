import Image from "next/image";
import Link from "next/link";
import React, { ReactElement } from "react";
import tw, { styled } from "twin.macro";

import { ENDPOINTS } from "@src/assets/constants/StyleConstants";
import { CategoryModel } from "@src/model/sanity";
import { absoluteFullSize, lqipBackground } from "@src/utils";
import { motion } from "framer-motion";
import { categoriesVariants } from "@src/assets/variants";

// TODO add imageSizes
type Props = {
	data: CategoryModel;
};

function Category({ data }: Props): ReactElement {
	const { slug, title, thumbnail } = data;

	return (
		<Container variants={categoriesVariants.item} key={data.slug}>
			<Link href={ENDPOINTS.category + "/" + slug} passHref>
				<a>
					<Title>{title}</Title>
				</a>
			</Link>
			<Thumbnail lqip={thumbnail.metadata.lqip}>
				<Image src={thumbnail.url} unsized />
			</Thumbnail>
		</Container>
	);
}

type ContainerProps = {};
const Container = styled(motion.article)<ContainerProps>`
	${tw`relative rounded overflow-hidden`}
	padding-bottom: 25%;

	transition: transform 250ms ease;

	:hover,
	:focus-within {
		transform: scale(1.05);
	}
`;

type TitleProps = {};
const Title = styled.h2<TitleProps>`
	${absoluteFullSize}
	${tw`z-10`}
  ${tw`flex items-center justify-center`}
  ${tw`text-white text-xl`}
	background: rgba(0, 0, 0, 0.7);
`;

type ThumbnailProps = {
	lqip: string;
};
const Thumbnail = styled.div<ThumbnailProps>`
	${absoluteFullSize}

	img {
		object-fit: cover;
		object-position: center center;
		${(p) => lqipBackground(p.lqip)}
	}

	img,
	div {
		width: 100%;
		height: 100%;
	}
`;

export default Category;
