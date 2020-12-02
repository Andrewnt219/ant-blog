import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { styled, theme } from "twin.macro";

import BlockContent from "@sanity/block-content-to-react";
import { ENDPOINTS } from "@src/assets/constants/StyleConstants";
import sanityClient from "@src/lib/sanity/client";
import { postSerializer } from "@src/lib/sanity/serializers/postSerializer";

import Breadcrumb from "../Breadcrumb";
import { CategoriesModel } from "@src/model/sanity/CategoriesModel";

type Props = {
	data: {
		categories: CategoriesModel;
		title: string;
		body: any;
	};
};

function PostBody({ data }: Props): ReactElement {
	const { body, categories, title } = data;
	const { asPath } = useRouter();

	const breadcrumbItems = [
		{
			text: "Home",
			href: "/",
		},
		{
			text: categories.main.title,
			href: `${ENDPOINTS.category}/${categories.main.slug}`,
		},
		{
			text: title,
			href: asPath,
		},
	];

	return (
		<Container>
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
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	& > header {
		display: none;
	}

	@media screen and (min-width: ${theme`screens.smDesktop`}) {
		display: block;
	}
`;

export default PostBody;
