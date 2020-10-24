import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import { styled } from "twin.macro";

export const BlockRenderer = (props: any) => {
	const { style = "normal" } = props.node;

	//   if (/^h\d/.test(style)) {
	//     const level = style.replace(/[^\d]/g, "");
	//     return React.createElement(
	//       style,
	//       { className: `heading-${level}` },
	//       props.children
	//     );
	//   }

	//   if (style === "h2") {
	//     return <h2 style={{ fontSize: "em" }}>{props.children}</h2>;
	//   }

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
	margin-bottom: 1rem;
`;

type Heading1Props = {};
const Heading1 = styled.h1<Heading1Props>``;

type Heading2Props = {};
const Heading2 = styled.h2<Heading2Props>``;

type BlockQuoteProps = {};
const BlockQuote = styled.blockquote<BlockQuoteProps>`
	border-left: 0.15em solid #ccc;
	padding: 0.1em 1em;
`;
