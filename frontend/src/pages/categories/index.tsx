import { STYLE_CONSTANTS } from '@src/assets/constants/StyleConstants';
import { categoriesVariants } from '@src/assets/variants';
import Category from '@src/components/Category';
import { CategoryModel } from '@src/model/sanity/CategoryModel';
import { SanityDataService } from '@src/service/sanity/sanity.data-service';
import { motion } from 'framer-motion';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import tw, { styled, theme } from 'twin.macro';

function Index({
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>): ReactElement {
  return (
    <>
      <Head>
        <title key="title">All categories | Andrew&apos;s blog</title>
      </Head>

      <Main>
        <header>
          <Heading>All categories</Heading>
        </header>
        <CategoriesContainer
          variants={categoriesVariants.container}
          animate="visible"
          initial="hidden"
        >
          {categories.map((category) => (
            <li key={category.slug}>
              <Category data={category} />
            </li>
          ))}
        </CategoriesContainer>
      </Main>
    </>
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

type HeadingProps = {};
const Heading = styled.h1<HeadingProps>`
  ${tw`text-3xl mb-5`}
`;

type CategoriesContainerProps = {};
const CategoriesContainer = styled(motion.ul)<CategoriesContainerProps>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1rem;
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
    revalidate: 1,
  };
};

export default Index;
