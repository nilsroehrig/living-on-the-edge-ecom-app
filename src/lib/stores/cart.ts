import type { Product } from '$lib/domain/Product';
import { None, Option, Some } from 'prelude-ts';
import { find, isNil, pathEq, reduce, reject } from 'ramda';
import { get, type Readable, writable } from 'svelte/store';

interface CartItem {
	product: Product;
	count: number;
}

export interface CartModel {
	items: CartItem[];
	value: number;
}

export interface CartStore extends Readable<CartModel> {
	addItem(product: Product, amount?: number): void;

	removeItem(productId: string, amount?: number): void;

	hasItems(): boolean;
}

const productIdEquals = pathEq(['product', 'id']);
const calculateValue = reduce(
	(acc: number, item: CartItem) => acc + item.product.price * item.count,
	0
);

export function createCartStore(items: CartItem[] = []): CartStore {
	const innerStore = writable<CartModel>(
		getCartStorage().getOrElse({
			items,
			value: calculateValue(items),
		})
	);
	const { update, subscribe } = innerStore;

	return {
		subscribe,
		addItem(product: Product, amount = 1): void {
			if (amount <= 0) {
				throw new TypeError(
					'"amount" needs to be greater 0 but was "' + amount + '"'
				);
			}

			return update((model) => {
				const existingProduct = find(productIdEquals(product.id), model.items);

				if (existingProduct != undefined) {
					existingProduct.count += amount;
				} else {
					model.items.push({ product, count: amount });
				}

				let newStoreValue = {
					items: model.items,
					value: calculateValue(model.items),
				};

				setCartStorage(newStoreValue);

				return newStoreValue;
			});
		},
		removeItem(productId: string, amount?: number): void {
			return update((model) => {
				const { items } = model;

				if (isNil(amount)) {
					const filteredItems = reject(productIdEquals(productId), items);
					const newStoreValue = {
						items: filteredItems,
						value: calculateValue(filteredItems),
					};

					setCartStorage(newStoreValue);

					return newStoreValue;
				}

				const updatedItems = model.items.reduce((acc, item) => {
					if (item.product.id === productId) {
						item.count -= amount;
					}

					if (item.count <= 0) {
						return acc;
					}

					return acc.concat(item);
				}, [] as CartItem[]);

				const newStoreValue = {
					items: updatedItems,
					value: calculateValue(updatedItems),
				};

				setCartStorage(newStoreValue);

				return newStoreValue;
			});
		},
		hasItems(): boolean {
			return get(innerStore)?.items?.length > 0 ?? false;
		},
	};
}

function setCartStorage(newValue: CartModel) {
	if (typeof localStorage == 'undefined') return;

	localStorage.setItem('cart', JSON.stringify(newValue));
}

function getCartStorage(): Some<CartModel> | None<CartModel> {
	if (typeof localStorage == 'undefined') return Option.none();

	return Option.ofNullable(localStorage.getItem('cart')).map(JSON.parse);
}
