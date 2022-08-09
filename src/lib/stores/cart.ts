import {
  __,
  add,
  append,
  find,
  has,
  modify,
  multiply,
  not,
  pathEq,
  reduce,
  subtract,
} from 'ramda';
import { get, type Readable, writable } from 'svelte/store';
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
const hasCount = has('count');

export function createCartStore(value: CartModel = { items: [] }): CartStore {
  const store = writable<CartModel>(value);
  const { update, subscribe } = store;

  return {
    subscribe,
    addItem(item): void {
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
    items(): CartItem[] {
      return get(store).items;
    },
    removeItem(itemToBeRemoved): void {
      const reducer = (newItems: CartItem[], currentItem: CartItem) => {
        if (not(hasId(itemToBeRemoved.productId, currentItem))) {
          return append(currentItem, newItems);
        }

        if (not(hasCount(itemToBeRemoved))) {
          return newItems;
        }

        if (currentItem.count - itemToBeRemoved.count! < 0) {
          return newItems;
        }

        return append(
          modify(
            'count',
            subtract(__, itemToBeRemoved.count as number),
            currentItem
          ),
          newItems
        );
      };

      return update(modify('items', reduce<CartItem, CartItem[]>(reducer, [])));
    },
    value(): number {
      return reduce(
        (acc, it) => add(acc, multiply(it.product.price, it.count)),
        0,
        get(store).items
      );
    },
  };
}