import { Product, type ProductJson } from '$lib/domain/Product';
import type { Service } from './Service';

import products from '$lib/data/products.json';
import categories from '$lib/data/categories.json';
import { InternalServerError, UnexpectedStatusError } from '$lib/errors/http';
import { Option } from 'prelude-ts';

interface ProductService extends Service<Product, string> {}

class JsonFileProductService implements ProductService {
  async getOne(id: string): Promise<Option<Product>> {
    const product = products.find((p) => p.id === id);
    const category = categories.find((c) => c.id === product?.category);
    if (!product || !category) {
      return Option.none<Product>();
    }
    return Option.some<Product>(
      Product.fromProductJson({ ...product, category })
    );
  }

  async getAll() {
    return products.reduce((acc, p) => {
      const category = categories.find((c) => c.id === p.category);
      if (category) {
        const product = Product.fromProductJson({
          ...p,
          category: { ...category },
        });
        acc.push(product);
      }

      return acc;
    }, [] as Product[]);
  }
}

class FetchProductService implements ProductService {
  private endpoint: string = '/api/products';

  constructor(private fetch: typeof global.fetch) {}

  async getOne(id: string) {
    try {
      const response = await this.fetch(`${this.endpoint}/`);

      if (response.ok) {
        const { product } = (await response.json()) as { product: ProductJson };
        return Option.some<Product>(Product.fromProductJson(product));
      }

      if (response.status === 404) {
        return Option.none<Product>();
      }

      if (response.status === 500) {
        return Promise.reject(new InternalServerError());
      }

      return Promise.reject(new UnexpectedStatusError(response.status));
    } catch (e) {
      throw new Error(
        `Something went wrong when fetching Product with id '${id}.`,
        e ? { cause: e as Error } : undefined
      );
    }
  }

  async getAll() {
    try {
      const response = await this.fetch(this.endpoint);

      if (response.ok) {
        const { products } = (await response.json()) as {
          products: ProductJson[];
        };
        return products.map(Product.fromProductJson);
      }

      if (response.status === 500) {
        return Promise.reject(new InternalServerError());
      }

      return Promise.reject(new UnexpectedStatusError(response.status));
    } catch (e) {
      throw new Error(
        `Something went wrong when fetching all products.`,
        e ? { cause: e as Error } : undefined
      );
    }
  }
}

export function createProductService(fetch?: typeof global.fetch) {
  if (fetch) return new FetchProductService(fetch);
  return new JsonFileProductService();
}
