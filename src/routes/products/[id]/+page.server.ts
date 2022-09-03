import { error } from '@sveltejs/kit';
import showdown from 'showdown';
import { createCategoryService } from '../../../lib/services/CategoryService';
import { createProductService } from '../../../lib/services/ProductService';
import type { PageServerLoad } from './$types';

const converter = new showdown.Converter();

export const load: PageServerLoad = async ({ params, platform }) => {
	const productService = createProductService(platform);
	const categoryService = createCategoryService(platform);

	const product = await productService
		.getSingleProduct(params.id)
		.then((option) => option.getOrThrow(error(404)));

	const { description, category: categoryId, ...rest } = product;
	const category = await categoryService
		.getSingleCategory(categoryId)
		.then((category) => category.getOrUndefined());

	return {
		product: {
			...rest,
			category,
			description: converter.makeHtml(product.description),
		},
	};
};
