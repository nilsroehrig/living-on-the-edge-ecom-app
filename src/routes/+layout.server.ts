import { createCategoryService } from '../lib/services/CategoryService';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ platform }) => {
	const categoryService = createCategoryService(platform);

	return {
		categories: await categoryService.getAllCategories(),
	};
};
