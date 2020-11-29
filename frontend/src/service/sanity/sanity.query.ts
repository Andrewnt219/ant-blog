// TODO: && post.id !== currentPost
export const RELATED_POSTS_QUERY = `
  *[_type == "post" && categories[0]->slug.current == $categorySlug && post._id != $postId] {
    title,
    _id,
    publishedAt,
    "thumbnail": mainImage {
      alt,
			"url": asset -> url,
			"metadata": asset -> metadata {
				"width": dimensions.width,
				"height": dimensions.height,
				lqip,
				"ratio": dimensions.ratio
			}
    },
    "slug": slug.current,
  }[0...4]
`;

export const SIDE_POSTS_QUERY = `
		*[_type == "post" && !isArchived && !isPinned] | order(_updatedAt desc) {
			title,
			"slug": slug.current,
			publishedAt,
			"category": categories[] -> {title, "slug": slug.current}[0],
			"thumbnail": mainImage {
				alt,
				"url": asset -> url,
				"metadata": asset -> metadata {
					"width": dimensions.width,
					"height": dimensions.height,
					lqip,
					"ratio": dimensions.ratio
				}
    	},
		}[0...3]
  `;

export const POST_QUERY = `
        *[slug.current == $slug] {
						_id,
						"categories": categories[] -> {title, "slug": slug.current},
            title,
            "thumbnail": mainImage.asset -> {
							url,
							metadata {
								lqip,
								"width": dimensions.width,
								"height": dimensions.height,
								"ratio": dimensions.aspectRatio
							}
						},
						body[] {
							...,
							_type == "image" => {
								...,
								"metadata": @.asset -> metadata {
									"width": dimensions.width, 
									"height": dimensions.height,
									lqip
								}
							},
							markDefs[] {
								...,
								_type == "internalLink" => {
									...,
									"url": "/" + @.post->slug.current,
								}
							}
						},
						author -> {
							name,
							"slug": slug.current,
							"avatar": image.asset -> {
								url,
								"metadata": metadata {
									lqip,
									"width": dimensions.width,
									"height": dimensions.height,
									"ratio": dimensions.aspectRatio,
								}
							},
							bio
						},
						publishedAt
        }[0]
    `;

export const POSTS_SLUG_QUERY = `*[_type == "post"]{
      slug{
        current
      }
    }`;

export const HOME_POSTS_QUERY = `
			*[_type == "post" && !isArchived] | order(_updatedAt desc) {
				isPinned,
				title,
				"slug": slug.current,
				publishedAt,
				"category": categories[] -> {title, "slug": slug.current}[0],
				"author": author -> name,
				"thumbnail": mainImage {
					alt,
					"url": asset -> url,
					"metadata": asset -> metadata {
						"width": dimensions.width,
						"height": dimensions.height,
						lqip,
						"ratio": dimensions.ratio
					}
				},
				snippet,
				body
			}
		`;
