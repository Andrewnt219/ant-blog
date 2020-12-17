import { CategoryModel, categoryModelQuery } from "./CategoryModel";
import { ImageModel } from "./ImageModel";
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
