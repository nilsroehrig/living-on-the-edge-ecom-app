import products from '$lib/data/products.json';
import type { Category } from '$lib/domain/Category';
import type { CategorizedProduct, Product } from '$lib/domain/Product';
import { Option } from 'prelude-ts';
import { assoc, clone, filter, map, pipe, propEq } from 'ramda';

export async function getSingleProduct (id: string): Promise<Option<Product>> {
	return Option.ofNullable(
		clone(products).find((product) => product.id === id),
	);
}

export async function getProductsByCategory (
	category: Category,
): Promise<CategorizedProduct[]> {
	return pipe(
		filter<Product>(propEq('category', category.id)),
		map(assoc('category', category)),
	)(products);
}

export function createProductService (platform: Required<Readonly<App.Platform>>) {
	const store = platform.env.PRODUCTS;

	return {
		async getMultipleProducts (ids: string[]): Promise<Product[]> {
			const settled = await Promise.allSettled(
				ids.map((id) => store.get<Product>(id, { type: 'json' })),
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
	};
}
