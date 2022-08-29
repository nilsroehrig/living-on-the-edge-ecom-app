import { getAllCategories } from '../lib/services/CategoryService';

export const load = async () => {
	return {
		categories: await getAllCategories(),
	};
};
