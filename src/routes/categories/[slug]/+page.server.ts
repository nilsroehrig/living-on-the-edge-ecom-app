import { error } from '@sveltejs/kit';
import { Future } from 'prelude-ts';
import type { Category } from '../../../lib/domain/Category';
import type { CategorizedProduct } from '../../../lib/domain/Product';
import { getSingleCategoryBySlug } from '../../../lib/services/CategoryService';
import { createProductService } from '../../../lib/services/ProductService';
import type { Typify } from '../../../lib/types/Utility';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, platform }) => {
	let productsService: ReturnType<typeof createProductService>;

	try {
		productsService = createProductService(platform);
	} catch (e) {
		console.error(e);
		throw error(500);
	}

	const categoryOption = await getSingleCategoryBySlug(params.slug);
	const products = await categoryOption
		.map((category) =>
			Future.of(productsService.getProductsByCategory(category))
		)
		.getOrElse(Future.of(Promise.resolve([])));

	return categoryOption
		.map<ReturnType<PageServerLoad>>((category) => ({
			category: category as Typify<Category>,
			products: products as Typify<CategorizedProduct>[],
		}))
		.getOrThrow(error(404));
};
