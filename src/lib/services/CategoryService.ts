import type { Category } from '$lib/domain/Category';
import { Option } from 'prelude-ts';
import { find, isNil, map, prop, propEq, reject } from 'ramda';

export function createCategoryService(platform: App.Platform) {
	if (isNil(platform?.env)) {
		throw new TypeError('`platform.env` must have a value.');
	}

	const store = platform.env.CATEGORIES;

	const service = {
		async getAllCategories(): Promise<Category[]> {
			return store
				.list()
				.then(prop('keys'))
				.then(map((key) => store.get<Category>(key.name, 'json')))
				.then((categoryPromises) => Promise.all(categoryPromises))
				.then((categoryRequests) => reject(isNil, categoryRequests));
		},

		async getRandomCategory(): Promise<Category> {
			return store
				.list()
				.then(prop('keys'))
				.then((keys) => keys[Math.floor(Math.random() * keys.length)])
				.then(prop('name'))
				.then((id) => store.get<Category>(id, 'json'))
				.then((category) => (category === null ? ({} as Category) : category));
		},

		async getSingleCategoryBySlug(slug: string): Promise<Option<Category>> {
			return service
				.getAllCategories()
				.then(find<Category>(propEq('slug', slug)))
				.then(Option.ofNullable);
		},

		async getSingleCategory(id: string): Promise<Option<Category>> {
			return store.get<Category>(id, 'json').then(Option.ofNullable);
		},
	};
	return service;
}
