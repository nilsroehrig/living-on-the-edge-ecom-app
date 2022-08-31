import { getRandomCategory } from '$lib/services/CategoryService';
import {
	createProductService,
} from '$lib/services/ProductService';
import { error } from '@sveltejs/kit';
import { isNil } from 'ramda';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	if (isNil(platform?.env)) {
		throw error(500);
	}

	const featuredIds: string[] | null = await platform.env.CONTENT.get(
		'featuredIds',
		{
			type: 'json',
		}
	);

	if (isNil(featuredIds)) {
		throw error(500);
	}

	// @ts-ignore
	const service = createProductService(platform);
	return {
		category: await getRandomCategory(),
		products: await service.getMultipleProducts(featuredIds),
	};
};
