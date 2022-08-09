import products from '$lib/data/products.json';
import type { Product } from '$lib/domain/Product';
import { Option } from 'prelude-ts';
import { clone } from 'ramda';

export async function getMultipleProducts(ids: string[]): Promise<Product[]> {
  const filtered = products.filter((product) => ids.includes(product.id));
  return clone(filtered);
}

export async function getSingleProduct(id: string): Promise<Option<Product>> {
  return Option.ofNullable(
    clone(products).find((product) => product.id === id)
  );
}
