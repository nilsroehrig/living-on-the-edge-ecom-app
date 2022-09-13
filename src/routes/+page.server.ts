import { createCategoryService } from '$lib/services/CategoryService';
import { createProductService } from '$lib/services/ProductService';
import { error } from '@sveltejs/kit';
import { Option } from 'prelude-ts';
import { isNil } from 'ramda';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform, url }) => {
	const categoryIdParam = Option.ofNullable(url.searchParams.get('categoryId'));

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
		category: await categoryIdParam
			.map(categoryService.getSingleCategory)
			.getOrElse(categoryService.getRandomCategory())
			.then((categoryOption) => categoryOption.getOrUndefined()),
		products: await productsService.getMultipleProducts(featuredProducts),
	};
};
