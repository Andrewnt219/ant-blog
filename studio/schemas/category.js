export default {
	name: "category",
	title: "Category",
	type: "document",
	fields: [
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
	],
};
