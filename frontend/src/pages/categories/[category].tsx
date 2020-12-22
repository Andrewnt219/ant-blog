import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import { NUMBER_CONSTANTS } from '@src/assets/constants/StyleConstants';
import Broken from '@src/components/Broken';
import CategoryPage from '@src/components/page/CategoryPage';
import { CategoryPageContent } from '@src/model/CategoryPageContent';
import { SanityDataService } from '@src/service/sanity/sanity.data-service';

type Props = InferGetServerSidePropsType<typeof getServerSideProps> & {};

function Category({ prefetchedContent }: Props): ReactElement {
	const { back } = useRouter();
	if (prefetchedContent.postsCount === 0) {
		return (
			<>
				<Broken height="20rem" errorText="Wow, such empty, much space" />
				{/* TODO style button */}
				<button onClick={back}>Go back</button>
			</>
		);
	}

	return <CategoryPage prefetchedContent={prefetchedContent} />;
}

/* -------------------------------------------------------------------------- */
/*                                 SERVER CODE                                */
/* -------------------------------------------------------------------------- */

type ServerProps = {
	prefetchedContent: CategoryPageContent;
};
type Params = {
	category: string;
};

export const getServerSideProps: GetServerSideProps<
	ServerProps,
	Params
> = async ({ params, query }) => {
	const prefetchedContent = await SanityDataService.getInstance().getCategoryPageContent(
		params!.category,
		query.page ? +query.page : 1,
		NUMBER_CONSTANTS.defaultPerPage
	);

	return {
		props: { prefetchedContent },
	};
};

export default Category;
