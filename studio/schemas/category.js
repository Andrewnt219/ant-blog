export default {
	name: "category",
	title: "Category",
	type: "document",

	initialValue: {
		isFeatured: false,
	},

	fields: [
		{
			name: "isFeatured",
			title: "Feature in home page",
			type: "boolean",
		},
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (Rule) =>
				Rule.required().error(
					"Không có cái này không lấy bài được, ấn generate nếu lười type."
				),
		},
		{
			name: "description",
			title: "Description",
			type: "text",
		},
		{
			name: "image",
			title: "Image",
			type: "image",
			options: {
				hotspot: true,
				metadata: ["lqip"],
			},
		},
	],
	preview: {
		select: {
			title: "title",
			media: "image",
			isFeatured: "isFeatured",
		},

		prepare(selection) {
			const { title, media, isFeatured } = selection;

			let attributedTitle = title;

			if (isFeatured) {
				attributedTitle = "🌟 " + attributedTitle;
			}

			return {
				...selection,
				title: attributedTitle,
			};
		},
	},
};
