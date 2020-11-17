import BlockContent from "@sanity/block-content-to-react";
import React, { ReactElement } from "react";
import { styled } from "twin.macro";
import sanityClient from "@src/lib/sanity/client";
import { postSerializer } from "@src/lib/sanity/serializers/postSerializer";
import Breadcrumb from "../Breadcrumb";
import { useRouter } from "next/router";
import { ENDPOINTS } from "@src/assets/constants/StyleConstants";

type Props = {
	data: {
		categories: {
			title: string;
			slug: string;
		}[];
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
			text: categories[0].title,
			href: `${ENDPOINTS.category}/${categories[0].slug}`,
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
const Container = styled.div<ContainerProps>``;

export default PostBody;
