import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import tw, { styled, theme } from "twin.macro";

export const BlockRenderer = (props: any) => {
	let Block: any;

	switch (props.node.style) {
		case "normal":
			Block = Normal;
			break;

		case "h2":
			Block = Heading2;
			break;

		case "h3":
			Block = Heading3;
			break;

		case "h4":
			Block = Heading4;
			break;

		case "blockquote":
			Block = Blockquote;
			break;

		// Fall back to default handling
		default:
			return (BlockContent as any).defaultSerializers.types.block(props);
	}

	return <Block>{props.children}</Block>;
};

type NormalProps = {};
const Normal = styled.p<NormalProps>`
	font-family: "Lora", serif;
	${tw`mb-6`}
`;

type Heading2Props = {};
const Heading2 = styled.h2<Heading2Props>`
	${tw`text-2xl font-700  mb-3 mt-12`}
`;

type Heading3Props = {};
const Heading3 = styled.h3<Heading3Props>`
	${tw`mt-10 mb-3 font-700 text-xl`}
`;

type Heading4Props = {};
const Heading4 = styled.h3<Heading4Props>`
	${tw`mt-8 mb-3 font-700 text-lg`}
`;

type BlockquoteProps = {};
const Blockquote = styled.blockquote<BlockquoteProps>`
	${tw`font-500 text-2xl text-center leading-snug`}
	${tw`relative my-10 pt-4 px-2`}


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

	@media screen and (min-width: ${theme`screens.smDesktop`}) {
		${tw`px-8`}
	}
`;
