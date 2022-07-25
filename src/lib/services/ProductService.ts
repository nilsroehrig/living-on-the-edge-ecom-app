import products from '$lib/data/products.json';
import type { Product } from '$lib/domain/Product';
import { clone } from 'ramda';

export async function getMultipleProducts(ids: string[]): Promise<Product[]> {
  const filtered = products.filter((product) => ids.includes(product.id));
  return clone(filtered);
}
