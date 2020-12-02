import { CategoryModel } from "./CategoryModel";
import { ImageModel } from "./ImageModel";
export type CategoriesModel = {
	main: CategoryModel;
	subs: CategoryModel[];
};
