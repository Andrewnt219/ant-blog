import React, { ReactElement } from "react";
import tw, { styled } from "twin.macro";

export type HomepageArticleProps = {
	title: string;
	slug: {
		_type: "slug";
		current: string;
	};
	mainImage: {
		asset: {
			_id: string;
			url: string;
		};
	};
};

function HomepageArticle({}: HomepageArticleProps): ReactElement {
	return <Container></Container>;
}

type ContainerProps = {};
const Container = styled.article<ContainerProps>``;

export default HomepageArticle;
