import type { Category } from '$lib/domain/Category';
import type {
	ProductWithCategory,
	Product,
	ProductWithCategoryId,
} from '$lib/domain/Product';
import { Option } from 'prelude-ts';
import { assoc, isNil, map, prop, reduce } from 'ramda';

export function createProductService(platform: App.Platform) {
	if (isNil(platform?.env)) {
		throw new TypeError('`platform.env` must have a value.');
	}

	const store = platform.env.PRODUCTS;

	return {
		async getMultipleProducts(ids: string[]): Promise<Product[]> {
			const settled = await Promise.allSettled(
				ids.map((id) => store.get<Product>(id, { type: 'json' }))
			);
			return settled.reduce((acc, it) => {
				if (it.status === 'rejected') {
					console.error(it.reason);
					return acc;
				}

				if (it.value == null) {
					return acc;
				}

				return acc.concat(it.value);
			}, [] as Product[]);
		},
		async getProductsByCategory(
			category: Category
		): Promise<ProductWithCategory[]> {
			const productKeys = await store
				.list()
				.then(prop('keys'))
				.then(map(prop('name')));

			return Promise.allSettled(
				map((key) => store.get<Product>(key, { type: 'json' }), productKeys)
			).then(
				reduce((acc, it) => {
					if (
						it.status === 'rejected' ||
						it.value == null ||
						it.value.category !== category.id
					) {
						return acc;
					}

					return acc.concat(assoc('category', category, it.value));
				}, [] as ProductWithCategory[])
			);
		},
		async getSingleProduct(id: string): Promise<Option<ProductWithCategoryId>> {
			return store
				.get<ProductWithCategoryId>(id, { type: 'json' })
				.then(Option.ofNullable);
		},
	};
}
