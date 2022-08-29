import categories from '$lib/data/categories.json';
import products from '$lib/data/products.json';
import { error } from '@sveltejs/kit';
import showdown from 'showdown';
import type { PageServerLoad } from './$types';

const converter = new showdown.Converter();

export const load: PageServerLoad = async ({ params }) => {
	const product = products.find((p) => p.id === params.id);

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
