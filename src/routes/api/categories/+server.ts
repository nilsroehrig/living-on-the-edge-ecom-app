import { APPLICATION_JSON, CONTENT_TYPE } from '$lib/constants/http';
import categories from '$lib/data/categories.json';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	return new Response(JSON.stringify({ categories }), {
		headers: {
			[CONTENT_TYPE]: APPLICATION_JSON,
		},
	});
};
