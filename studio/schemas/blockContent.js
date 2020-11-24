import React from "react";
import { AiFillHighlight } from "react-icons/ai";
import { RiArticleFill } from "react-icons/ri";
import { FaPen, FaImage } from "react-icons/fa";
import { BiMoveHorizontal } from "react-icons/bi";
/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export default {
	title: "Block Content",
	name: "blockContent",
	type: "array",
	of: [
		{
			title: "Block",
			type: "block",
			// Styles let you set what your user can mark up blocks with. These
			// correspond with HTML tags, but you can set any title or value
			// you want and decide how you want to deal with it where you want to
			// use your content.
			styles: [
				{ title: "Normal", value: "normal" },
				{ title: "H2", value: "h2" },
				{ title: "H3", value: "h3" },
				{ title: "H4", value: "h4" },
				{ title: "Quote", value: "blockquote" },
			],
			lists: [
				{ title: "Bullet", value: "bullet" },
				{ title: "Number", value: "number" },
			],
			// Marks let you mark up inline text in the block editor.
			marks: {
				// Decorators usually describe a single property – e.g. a typographic
				// preference or highlighting by editors.
				decorators: [
					// {
					// 	title: "Hightlight",
					// 	value: "highlight",
					// 	blockEditor: {
					// 		icon: () => <AiFillHighlight />,
					// 		render: ({ children }) => (
					// 			<span style={{ background: "yellow" }}>{children}</span>
					// 		),
					// 	},
					// },
					{ title: "Strong", value: "strong" },
					{ title: "Emphasis", value: "em" },
					{ title: "Underline", value: "underline" },
					{ title: "Strike", value: "strike-through" },
					{
						title: "Author",
						value: "author",
						blockEditor: {
							icon: () => <FaPen />,
							render: ({ children }) => (
								<figcaption style={{ textAlign: "right" }}>
									&ndash; {children}
								</figcaption>
							),
						},
					},
				],
				// Annotations can be any object structure – e.g. a link or a footnote.
				annotations: [
					// {
					// 	name: "quote",
					// 	type: "object",
					// 	title: "Quote",
					// 	blockEditor: {
					// 		icon: () => <FaQuoteRight />,
					// 		render: ({ children, author }) => (
					// 			<blockquote
					// 				style={{
					// 					borderLeft: "solid gray 2px",
					// 					margin: 0,
					// 					paddingLeft: "1rem",
					// 				}}
					// 			>
					// 				<p style={{ fontStyle: "italic" }}>{children}</p>
					// 				<figcaption style={{ textAlign: "right" }}>
					// 					&ndash; {author}
					// 				</figcaption>
					// 			</blockquote>
					// 		),
					// 	},
					// 	fields: [
					// 		{
					// 			name: "author",
					// 			type: "string",
					// 			title: "Author",
					// 		},
					// 	],
					// },

					{
						name: "internalLink",
						type: "object",
						title: "Internal Link",
						blockEditor: {
							icon: () => <RiArticleFill />,
							render: ({ children }) => (
								<span style={{ color: "#2d53fe" }}>{children}</span>
							),
						},

						fields: [
							{
								name: "post",
								type: "reference",
								to: [{ type: "post" }],
							},
						],
					},
					{
						title: "URL",
						name: "link",
						type: "object",
						blockEditor: {
							render: ({ children }) => (
								<span style={{ color: "#e31c3d" }}>{children}</span>
							),
						},
						fields: [
							{
								title: "URL",
								name: "href",
								type: "url",
							},
						],
					},
				],
			},
		},
		// You can add additional types here. Note that you can't use
		// primitive types such as 'string' and 'number' in the same array
		// as a block type.
		{
			type: "image",
			options: { hotspot: true },
			icon: FaImage,
			options: {
				metadata: ["lqip", "dimensions"],
			},
			fields: [
				{
					type: "string",
					name: "alt",
					title: "Alternative text",
					description: `This will help when viewers cannot see the image`,
					options: { isHighlighted: true },
				},
				{
					type: "string",
					name: "caption",
					title: "Caption",
					options: { isHighlighted: true },
				},
			],
		},
		{
			type: "youtube",
		},
	],
};
