export default {
	name: "post",
	title: "Post",
	type: "document",

	initialValue: {
		isArchived: false,
		publishedAt: new Date().toISOString(),
		isPinned: false,
	},

	fields: [
		{
			name: "isPinned",
			title: "Pinned Post",
			type: "boolean",
			description: "Nếu bật thì bài post sẽ nằm trong slider ở đầu trang chủ.",
			// validation: (Rule) =>
			// 	Rule.required().custom(() =>
			// 		client
			// 			.fetch(
			// 				`
			// 					*[_type == 'post' && isPinned].isPinned
			// 				`
			// 			)
			// 			.then((post) =>
			// 				post.length > 3
			// 					? "Em pin tối đa 03 bài thôi nha, tham thì thâm đó =))."
			// 					: true
			// 			)
			// 	),
		},
		{
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule) => [
				Rule.required().error("Em quên đặt tựa nè."),
				Rule.max(70).warning(
					"Tựa quá dài có thể ảnh hưởng tới thẩm mỹ của web, cơ mà tùy em =))"
				),
			],
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
			name: "snippet",
			title: "Content snippet",
			type: "text",
			description: "A short introduction about the post",
			validation: (Rule) => [
				Rule.required().error("Vì tính thẩm mỹ của web, em nên ghi cái này."),
				Rule.max(200).warning("Ngắn ngắn thôi em, 200 letters đổ lại."),
			],
			rows: 3,
		},
		{
			name: "author",
			title: "Author",
			type: "reference",
			to: { type: "author" },
			validation: (Rule) =>
				Rule.required().error(
					"Hey, đừng ngại, cho mọi người biết ai đã viết bày này."
				),
		},
		{
			name: "mainImage",
			title: "Main image",
			type: "image",
			fields: [
				{
					name: "alt",
					title: "Alternate text",
					type: "string",
					options: {
						isHightlighted: true,
					},
				},
			],
			options: {
				hotspot: true,
				metadata: ["lqip", "dimensions"],
			},
			validation: (Rule) =>
				Rule.required().error(
					"Main image (thumbnail) như avatar của bài viết á, cũng là tấm hình đầu tiên của bài viết."
				),
		},
		// TODO: add isMain attribute
		{
			name: "categories",
			title: "Categories",
			type: "array",
			of: [{ type: "reference", to: { type: "category" } }],
			validation: (Rule) => [
				Rule.required()
					.min(1)
					.error(
						"Em nên phân loại, không có ô này nó xuất hiện undefined web có sụp ráng chịu =))."
					),
				Rule.unique().error(
					"Say hay là một ngày dài? Có category bị trùng nè."
				),
			],
			description: "Category xếp đầu tiên là category chính, còn lại là phụ.",
		},
		{
			name: "publishedAt",
			title: "Published at",
			type: "datetime",
			options: {
				dateFormat: "MMM DD YYYY",
			},
			validation: (Rule) => Rule.required().error("Em quên để ngày đăng nè."),
			description: "Current time is generated by default.",
		},
		{
			name: "body",
			title: "Body",
			type: "blockContent",
			validation: (Rule) =>
				Rule.required().error(
					"Chờ chút, bài này là clickbait à? Nội dung bài viết đâu rồi =))."
				),
			options: {
				metadata: ["lqip"],
			},
		},
		{
			name: "isArchived",
			title: "Archived",
			type: "boolean",
			description:
				"Nếu bật thì post này sẽ không xuất hiện trên web nữa, nhưng vẫn còn ở trong studio",
			validation: (Rule) =>
				Rule.custom((isArchived, context) => {
					if (context.document.isPinned && isArchived) {
						return "Em tháo pin rồi hãy archive nha.";
					}

					return true;
				}),
		},
	],

	preview: {
		select: {
			title: "title",
			author: "author.name",
			media: "mainImage",
			isPinned: "isPinned",
			isArchived: "isArchived",
		},
		prepare(selection) {
			const { author, isPinned, title, isArchived } = selection;

			let attributedTitle = title;

			if (isArchived) {
				attributedTitle = "📦 " + attributedTitle;
			}

			if (isPinned) {
				attributedTitle = "📌 " + attributedTitle;
			}

			return {
				...selection,
				title: attributedTitle,
				subtitle: author && `by ${author}`,
			};
		},
	},
};
