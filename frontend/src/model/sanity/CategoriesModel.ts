import { CategoryModel, categoryModelQuery } from "./CategoryModel";
export type CategoriesModel = {
	main: CategoryModel;
	subs: CategoryModel[];
};

export const categoriesModelQuery = `
	{
		"main": categories[_type == "mainCategory"] -> ${categoryModelQuery} [0],
		"subs": categories[_type == "subcategory"] -> ${categoryModelQuery},
	}
`;
