import { ReactElement } from 'react';
import { SanityClientErrorResponse } from 'sanity';

import Broken from '@src/components/Broken';
import Loading from '@src/components/Loading';

export function renderPosts<
	P extends any[],
	E extends SanityClientErrorResponse
>(
	posts: P | undefined,
	error: E | undefined,
	Component: JSX.Element
): ReactElement {
	let renderedPosts = <Loading height="10rem" loadingText="Fetching posts" />;

	if (error) {
		renderedPosts = (
			<Broken errorText="Fail to fetch posts :(" height="10rem" />
		);
	}

	if (posts) {
		renderedPosts = Component;
	}

	return renderedPosts;
}
