import { BiMoveHorizontal } from "react-icons/bi";
import React from "react";

export default {
	name: "breaker",
	type: "object",
	title: "Break",
	icon: BiMoveHorizontal,
	preview: {
		component: () => <hr width="50%" />,
	},
	fields: [
		{
			name: "style",
			description: "This feature is currently not available",
			type: "string",
			title: "Break style",
			options: {
				list: [
					{ title: "Line break", value: "lineBreak" },
					{ title: "Page break", value: "pageBreak" },
				],
			},
		},
	],
};
