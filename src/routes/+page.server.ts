import { createCategoryService } from '$lib/services/CategoryService';
import { createProductService } from '$lib/services/ProductService';
import { error } from '@sveltejs/kit';
import { isNil } from 'ramda';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	if (isNil(platform?.env)) {
		throw error(500, `platform: ${platform}, env: ${platform?.env}`);
	}

	const featuredProducts: string[] | null = await platform.env.CONTENT.get(
		'featuredProducts',
		{
			type: 'json',
		}
	);

	if (isNil(featuredProducts)) {
		throw error(500, `featuredProducts: ${featuredProducts}`);
	}

	const productsService = createProductService(platform);
	const categoryService = createCategoryService(platform);

	return {
		category: await categoryService.getRandomCategory(),
		products: await productsService.getMultipleProducts(featuredProducts),
	};
};
