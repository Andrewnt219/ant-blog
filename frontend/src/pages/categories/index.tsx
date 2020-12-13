import {
	ENDPOINTS,
	STYLE_CONSTANTS,
} from "@src/assets/constants/StyleConstants";
import { CategoryModel } from "@src/model/sanity/CategoryModel";
import { SanityDataService } from "@src/service/sanity/sanity.data-service";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import React, { ReactElement } from "react";
import { styled, theme } from "twin.macro";

type Props = InferGetStaticPropsType<typeof getStaticProps> & {};

function Index({ categories }: Props): ReactElement {
	return (
		<Main>
			{categories.map((category) => (
				<a href={ENDPOINTS.category + "/" + category.slug} key={category.slug}>
					<h2>{category.title}</h2>
					<img src={category.thumbnail.url} alt={category.title} width={100} />
				</a>
			))}
		</Main>
	);
}

type MainProps = {};
const Main = styled.main<MainProps>`
	padding: 2rem ${STYLE_CONSTANTS.mobileBodyPadding};
	margin: 0 auto;

	@media screen and (min-width: ${theme`screens.smTablet`}) {
		padding: 2rem ${STYLE_CONSTANTS.bodyPadding};
	}
`;
type StaticProps = {
	categories: CategoryModel[];
};
export const getStaticProps: GetStaticProps<StaticProps> = async () => {
	const categories = await SanityDataService.getInstance().getCategories();

	return {
		props: {
			categories,
		},
	};
};

export default Index;
