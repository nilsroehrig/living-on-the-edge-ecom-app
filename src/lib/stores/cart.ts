import { find, pathEq } from 'ramda';
import { type Readable, writable } from 'svelte/store';
import type { CategorizedProduct } from '../domain/Product';

interface CartItem {
  product: CategorizedProduct;
  count: number;
}

export interface CartModel {
  items: CartItem[];
}

export interface CartStore extends Readable<CartModel> {
  addItem(item: CartItem): void;

  removeItem(item: { productId: string; count?: number }): void;

  items(): CartItem[];

  value(): number;
}

const hasId = pathEq(['product', 'id']);

export function createCartStore(): CartStore {
  const { update, subscribe } = writable<CartModel>({ items: [] });

  return {
    subscribe,
    async addItem(item): Promise<void> {
      if (item.count <= 0) return;

      return update((model) => {
        const existingProduct = find(hasId(item.product.id), model.items);
        if (existingProduct != undefined) {
          existingProduct.count += item.count;
        } else {
          model.items.push(item);
        }

        return model;
      });
    },
    items() {
      throw 'Not implemented yet';
    },
    removeItem(item): void {
      throw 'Not implemented yet';
    },
    value(): number {
      throw 'Not implemented yet';
    },
  };
}
