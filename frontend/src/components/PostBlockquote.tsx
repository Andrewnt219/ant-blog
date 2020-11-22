import React, { ReactElement, ReactNode } from "react";
import tw, { styled } from "twin.macro";

type Props = {
	author?: string;
	children: ReactNode;
};

function PostBlockquote({ children, author }: Props): ReactElement {
	return (
		<Blockquote>
			<Quote>{children}</Quote>
			<Author>{author}</Author>
		</Blockquote>
	);
}

type BlockquoteProps = {};
const Blockquote = styled.blockquote<BlockquoteProps>`
	${tw`font-500 text-2xl text-center leading-snug`}
	${tw`relative my-10 pt-4 px-8`}


	::before {
		${tw`z-0`}
		${tw`text-accent opacity-25`}
		font-size: 7rem;

		content: "\\201c";
		position: absolute;
		top: 0;
		left: 50%;

		transform: translate(-50%, -1rem) rotate(1deg);
		font-family: "Georgia";
		line-height: initial;
	}
`;

type QuoteProps = {};
const Quote = styled.p<QuoteProps>`
	${tw`mb-5`}
`;

type AuthorProps = {};
const Author = styled.figcaption<AuthorProps>`
	${tw`text-ltextColor text-sm font-heading font-400`}
`;

export default PostBlockquote;
