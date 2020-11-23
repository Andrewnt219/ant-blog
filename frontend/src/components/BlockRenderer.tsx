import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import tw, { styled } from "twin.macro";

export const BlockRenderer = (props: any) => {
	const { style = "normal" } = props.node;

	if (style === "normal") {
		return <Normal>{props.children}</Normal>;
	}

	if (style === "h1") {
		return <h1>{props.children}</h1>;
	}

	if (style === "h2") {
		return <h2>{props.children}</h2>;
	}

	if (style === "h3") {
		return <Heading3>{props.children}</Heading3>;
	}

	if (style === "blockquote") {
		return <Blockquote>{props.children}</Blockquote>;
	}

	// Fall back to default handling
	return (BlockContent as any).defaultSerializers.types.block(props);
};

type NormalProps = {};
const Normal = styled.p<NormalProps>`
	font-family: "Lora", serif;
	${tw`mb-6`}
`;

type Heading1Props = {};
const Heading1 = styled.h1<Heading1Props>``;

type Heading2Props = {};
const Heading2 = styled.h2<Heading2Props>``;

type Heading3Props = {};
const Heading3 = styled.h3<Heading3Props>`
	${tw`mt-10 mb-3 font-700 text-xl`}
`;

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
