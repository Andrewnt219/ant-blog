export default {
	name: "comment",
	type: "document",
	title: "Comment",
	fields: [
		{
			name: "name",
			type: "string",
			readOnly: true,
			//title: "Name" // optional, Sanity will create capital from "name"
		},
		{
			name: "text",
			type: "text",
			readOnly: true,
		},
		{
			// used in object reference (comment.post)
			name: "post",
			type: "reference",
			readOnly: true,
			// can reference to many things
			to: [
				{
					// match with post.js
					type: "post",
				},
			],
		},
	],
};
