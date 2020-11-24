// TODO: && post.id !== currentPost
export const RELATED_POSTS_QUERY = `
  *[_type == "post" && categories[0]->slug.current == $categorySlug] {
    title,
    _id,
    publishedAt,
    "image": mainImage {
      alt,
      "url": asset -> url
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
			"image": mainImage {
				alt,
				"url": asset -> url
			}
		}[0...3]
  `;

export const POST_QUERY = `
        *[slug.current == $slug] {
						_id,
						"categories": categories[] -> {title, "slug": slug.current},
            title,
            "thumbnailSrc": mainImage.asset -> url,
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
							"avatarSrc": image.asset -> url,
							bio
						},
						publishedAt,
						rawContent
        }[0]
    `;

export const POSTS_SLUG_QUERY = `*[_type == "post"]{
      slug{
        current
      }
    }`;

// TODO: add lqip. "lqip": mainImage.asset->metadata.lqip
// "lqip": body[].asset->metadata (watch out for null)
export const HOME_POSTS_QUERY = `
			*[_type == "post" && !isArchived] | order(_updatedAt desc) {
				isPinned,
				title,
				"slug": slug.current,
				publishedAt,
				"category": categories[] -> {title, "slug": slug.current}[0],
				"author": author -> name,
				rawContent,
				"image": mainImage {
					alt,
					"url": asset -> url
				},
				snippet
			}
		`;
