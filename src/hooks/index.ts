import { dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import { isNil } from 'ramda';

export const handle: Handle = async ({ event, resolve }) => {
	if (dev && isNil(event.platform)) {
		const { categoryStore, contentStore, productStore } = await import(
			'./kv-mock'
		);
		event.platform = {
			env: {
				PRODUCTS: productStore,
				CATEGORIES: categoryStore,
				CONTENT: contentStore,
			},
		};
	}
	return resolve(event);
};
