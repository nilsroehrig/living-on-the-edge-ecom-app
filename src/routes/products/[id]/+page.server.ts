import categories from '$lib/data/categories.json';
import { error } from '@sveltejs/kit';
import showdown from 'showdown';
import { createProductService } from '../../../lib/services/ProductService';
import type { PageServerLoad } from './$types';

const converter = new showdown.Converter();

export const load: PageServerLoad = async ({ params, platform }) => {
	const productService = createProductService(platform);
	const product = await productService
		.getSingleProduct(params.id)
		.then((option) => option.getOrUndefined());

	if (typeof product === 'undefined') {
		throw error(404);
	}

	const { description, category: categoryId, ...rest } = product;
	const category = categories.find((c) => c.id === categoryId);

	return {
		product: {
			...rest,
			category: {
				...category,
			},
			description: converter.makeHtml(product.description),
		},
	};
};
