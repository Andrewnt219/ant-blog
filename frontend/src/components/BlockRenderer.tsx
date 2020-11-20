import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import tw, { styled } from "twin.macro";

export const BlockRenderer = (props: any) => {
	const { style = "normal" } = props.node;

	if (style === "normal") {
		return <Normal>{props.children}</Normal>;
	}

	if (style === "blockquote") {
		return <BlockQuote>{props.children}</BlockQuote>;
	}

	// Fall back to default handling
	return (BlockContent as any).defaultSerializers.types.block(props);
};

type NormalProps = {};
const Normal = styled.p<NormalProps>`
	font-family: "Lora", serif;
	${tw`mb-6`}
`;

// type Heading1Props = {};
// const Heading1 = styled.h1<Heading1Props>``;

// type Heading2Props = {};
// const Heading2 = styled.h2<Heading2Props>``;

type BlockQuoteProps = {};
const BlockQuote = styled.blockquote<BlockQuoteProps>`
	${tw`font-500 text-2xl text-center leading-snug`}
	${tw`my-10 pt-4 px-8`}
`;
