import products from '$lib/data/products.json';
import type { Category } from '$lib/domain/Category';
import type { CategorizedProduct, Product } from '$lib/domain/Product';
import { Option } from 'prelude-ts';
import { assoc, clone, filter, map, pipe, propEq } from 'ramda';

export async function getMultipleProducts(ids: string[]): Promise<Product[]> {
	const filtered = products.filter((product) => ids.includes(product.id));
	return clone(filtered);
}

export async function getSingleProduct(id: string): Promise<Option<Product>> {
	return Option.ofNullable(
		clone(products).find((product) => product.id === id)
	);
}

export async function getProductsByCategory(
	category: Category
): Promise<CategorizedProduct[]> {
	return pipe(
		filter<Product>(propEq('category', category.id)),
		map(assoc('category', category))
	)(products);
}
