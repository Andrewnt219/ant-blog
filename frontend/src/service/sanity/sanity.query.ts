export const RELATED_POSTS_QUERY = `
	*[_type == "post" 
			&&  !isArchived 
			&& categories[_type == 'mainCategory'][0] -> slug.current == $categorySlug 
			&& _id != $postId
		] {
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
		*[_type == "post" 
				&& !isArchived 
				&& !isPinned
			] | order(_updatedAt desc) {
			title,
			"slug": slug.current,
			publishedAt,
			"category": categories[_type == 'mainCategory'][0] -> {title, "slug": slug.current},
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
						"categories": {
							"main": categories[_type == "mainCategory"] -> {
								title,
								"slug": slug.current,
								"thumbnail": image.asset -> {
									url,
									"metadata": metadata {
										lqip,
										"width": dimensions.width,
										"height": dimensions.height,
										"ratio": dimensions.aspectRatio
									}									
								}
							}[0],
							"subs": categories[_type == "subcategory"] -> {
								title,
								"slug": slug.current,
								"thumbnail": image.asset -> {
									url,
									"metadata": metadata {
										lqip,
										"width": dimensions.width,
										"height": dimensions.height,
										"ratio": dimensions.aspectRatio
									}	
								}
							},
						},
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

export const POSTS_SLUG_QUERY = `*[_type == "post" && !isArchived] {
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
				"category": categories[_type == 'mainCategory'][0] -> {title, "slug": slug.current},
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

export const CATEGORIES_QUERY = `
			*[_type == "category"] {
				title,
				"slug": slug.current,
				"thumbnail": image.asset -> {
					url,
					"metadata": metadata {
						lqip,
						"width": dimensions.width,
						"height": dimensions.height,
						"ratio": dimensions.aspectRatio
					}		
				}
			}
		`;

export const POSTS_BY_CATEGORY_QUERY = `
	*[_type == "post" 
		&& !isArchived 
		&& categories[] -> slug.current match $categorySlug 
	] | order(_updatedAt desc) {
				isPinned,
				title,
				"slug": slug.current,
				publishedAt,
				"category": categories[_type == 'mainCategory'][0] -> {title, "slug": slug.current},
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
