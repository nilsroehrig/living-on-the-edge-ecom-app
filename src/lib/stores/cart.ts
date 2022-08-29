import type { Product } from '$lib/domain/Product';
import {
	__,
	find,
	gt,
	identity,
	ifElse,
	isNil,
	map,
	modify,
	pathEq,
	pipe,
	propSatisfies,
	reduce,
	reject,
	subtract,
} from 'ramda';
import { type Readable, writable } from 'svelte/store';
import { None, Option, Some } from 'prelude-ts';

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

				const rejectIfCountIsZeroOrLower = reject(
					propSatisfies(gt(0), 'count')
				);

				const changeAmountIfItemMatchesProductId: (
					items: CartItem[]
				) => CartItem[] = map(
					ifElse(
						productIdEquals(productId),
						modify('count', subtract(__, amount)),
						identity
					)
				);

				const updatedItems = pipe(
					changeAmountIfItemMatchesProductId,
					rejectIfCountIsZeroOrLower
				)(model.items);

				const newStoreValue = {
					items: updatedItems,
					value: calculateValue(updatedItems),
				};

				setCartStorage(newStoreValue);

				return newStoreValue;
			});
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
