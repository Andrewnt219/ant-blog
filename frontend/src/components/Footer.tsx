import {
  ENDPOINTS,
  STYLE_CONSTANTS,
} from '@src/assets/constants/StyleConstants';
import { contactData } from '@src/assets/data/contactData';
import { RouteProps, routesData } from '@src/assets/data/routesData';
import { SocialMedia } from '@src/assets/enums/IconEnum';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { css } from 'styled-components';
import tw, { styled, theme } from 'twin.macro';
import Loading from './Loading';
import SocialMediaIcon from './SocialMediaIcon';

const icons: SocialMedia[] = [
  SocialMedia.FACEBOOK,
  SocialMedia.INSTAGRAM,
  SocialMedia.LINKEDIN,
];

type Props = {
  featuredCategories: RouteProps[];
};

function Footer({ featuredCategories }: Props): ReactElement {
  return (
    <Container>
      <FooterLinksContainer>
        <AuthorContainer>
          <Header>Andrew Nguyen</Header>
          <AuthorText>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium, nisi?
            <br />
            <Emphasis variants="white" href={`tel:${contactData.phone}`}>
              {contactData.phone}
            </Emphasis>
            <br />
            <Emphasis variants="primary" href={`mailto:${contactData.email}`}>
              {contactData.email}
            </Emphasis>
          </AuthorText>
        </AuthorContainer>

        <CategoryContainer>
          <Header>Category</Header>
          <CategorySet>
            {featuredCategories.map((category) => (
              <li key={category.text}>
                <Link href={category.href} passHref>
                  <Category>{category.text}</Category>
                </Link>
              </li>
            ))}
          </CategorySet>
        </CategoryContainer>

        <SocialMediasContainer>
          <Header>Follow Me</Header>
          <SocialMediaSet>
            {icons.map((icon) => (
              <StyledSocialMedia key={icon}>
                <SocialMediaIcon variants={icon} />
              </StyledSocialMedia>
            ))}
          </SocialMediaSet>
        </SocialMediasContainer>
      </FooterLinksContainer>

      <CopyRightContainer>
        <CustomLoading width="2em" />

        <CopyRight>
          &copy; 2020 Powered by{' '}
          <Emphasis
            variants="white"
            href="http://andrewnt.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Andrew
          </Emphasis>
        </CopyRight>

        <PagesContainer>
          {routesData.map((route) => (
            <li key={route.text}>
              <Link href={route.href} passHref>
                <PageLink>{route.text}</PageLink>
              </Link>
            </li>
          ))}
          <li>
            <Link href={ENDPOINTS.category} passHref>
              <PageLink>Category</PageLink>
            </Link>
          </li>
        </PagesContainer>
      </CopyRightContainer>
    </Container>
  );
}
const fullCssBreakpoint = theme`screens.smTablet`;

const hoveredLink = css`
  text-decoration: underline transparent;

  transition: color 300ms ease, text-decoration-color 300ms ease;

  :hover,
  :focus {
    color: white;
    text-decoration-color: currentColor;
  }
`;

type ContainerProps = {};
const Container = styled.footer<ContainerProps>`
  ${tw`w-full`}

  position: absolute;
  bottom: 0;
  left: 0;
  height: ${STYLE_CONSTANTS.footerHeight};
`;

const CustomLoading = styled(Loading)`
  position: absolute;
  bottom: 0;
  right: 0;
  ${tw`z-10`}
`;

// TODO one column on mobile
type FooterLinksContainerProps = {};
const FooterLinksContainer = styled.div<FooterLinksContainerProps>`
  ${tw` flex items-start font-300`}
  color: #747e91;
  background-color: #1c2433;
  padding: 5% ${STYLE_CONSTANTS.mobileBodyPadding};

  display: grid;
  gap: 3rem;

  @media screen and (min-width: ${fullCssBreakpoint}) {
    padding: 3% ${STYLE_CONSTANTS.bodyPadding};
  }

  @media screen and (min-width: ${fullCssBreakpoint}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

type HeaderProps = {};
const Header = styled.h3<HeaderProps>`
  ${tw`text-white font-700 mb-8`}
  font-size: 1.05em;
`;

type AuthorContainerProps = {};
const AuthorContainer = styled.div<AuthorContainerProps>``;

type AuthorTextProps = {};
const AuthorText = styled.p<AuthorTextProps>``;

type EmphasisProps = {
  variants: 'white' | 'primary';
};
const Emphasis = styled.a<EmphasisProps>`
  ${(p) =>
    p.variants === 'primary' &&
    css`
      ${tw`font-500 text-laccent`};

      :hover,
      :focus {
        text-decoration-color: currentColor;
      }
    `}

  ${(p) =>
    p.variants === 'white' &&
    css`
      ${tw`font-400`}
      color: inherit;

      :hover,
      :focus {
        ${tw`text-white`}
        text-decoration-color: currentColor;
      }
    `}

	text-decoration: underline transparent;
  transition: color 300ms ease, text-decoration-color 300ms ease;
  user-select: all;
`;

type CategoryContainerProps = {};
const CategoryContainer = styled.div<CategoryContainerProps>``;

type CategorySetProps = {};
const CategorySet = styled.ul<CategorySetProps>`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: flex-start;
  gap: 0.5rem 2rem;
`;

type CategoryProps = {};
const Category = styled.a<CategoryProps>`
  ${hoveredLink}
`;

type SocialMediasContainerProps = {};
const SocialMediasContainer = styled.div<SocialMediasContainerProps>``;

type SocialMediaSetProps = {};
const SocialMediaSet = styled.ul<SocialMediaSetProps>`
  ${tw`flex space-x-5 text-white`}
  ${tw`-ml-1`} // This equals the padding of StyledSocialMedia
`;

type StyledSocialMediaProps = {};
const StyledSocialMedia = styled.li<StyledSocialMediaProps>`
  ${tw`p-1 rounded-sm`}
  transition: background-color 300ms ease;

  svg {
    transition: fill 300ms ease;
  }

  :hover,
  :focus-within {
    ${tw`bg-white`}

    svg {
      fill: #1c2433;
    }
  }
`;

type CopyRightContainerProps = {};
const CopyRightContainer = styled.div<CopyRightContainerProps>`
  ${tw`text-white flex items-center justify-between font-500`}
  ${tw`relative`}
	background-color: #212a39;
  color: #98a5b9;
  padding: 5% ${STYLE_CONSTANTS.mobileBodyPadding};

  @media screen and (min-width: ${fullCssBreakpoint}) {
    padding: 3% ${STYLE_CONSTANTS.bodyPadding};
  }
`;

type CopyRightProps = {};
const CopyRight = styled.p<CopyRightProps>``;

type PagesContainerProps = {};
const PagesContainer = styled.ul<PagesContainerProps>`
  display: none;

  @media screen and (min-width: ${theme`screens.lgTablet`}) {
    display: flex;
    ${tw`space-x-5 `}
  }
`;

type PageLinkProps = {};
const PageLink = styled.a<PageLinkProps>`
  ${hoveredLink}
`;

export default Footer;
