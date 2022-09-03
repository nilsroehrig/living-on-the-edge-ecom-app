import type { Category } from '$lib/domain/Category';
import type { ProductWithCategory } from '$lib/domain/Product';
import { createCategoryService } from '$lib/services/CategoryService';
import { createProductService } from '$lib/services/ProductService';
import type { Typify } from '$lib/types/Utility';
import { error } from '@sveltejs/kit';
import { Future } from 'prelude-ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, platform }) => {
	const productsService = createProductService(platform);
	const categoryService = createCategoryService(platform);

	const categoryOption = await categoryService.getSingleCategoryBySlug(
		params.slug
	);
	const products = await categoryOption
		.map((category) =>
			Future.of(productsService.getProductsByCategory(category))
		)
		.getOrElse(Future.of(Promise.resolve([])));

	return categoryOption
		.map<ReturnType<PageServerLoad>>((category) => ({
			category: category as Typify<Category>,
			products: products as Typify<ProductWithCategory>[],
		}))
		.getOrThrow(error(404));
};
