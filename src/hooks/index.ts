import { dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import { isNil } from 'ramda';
import { categoryStore, contentStore, productStore } from './kv-mock';

export const handle: Handle = ({ event, resolve }) => {
	if (dev && isNil(event.platform)) {
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
