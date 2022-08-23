import type { CategorizedProduct, Product } from '$lib/domain/Product';
import {
	__,
	add,
	find,
	gt,
	identity,
	ifElse,
	isNil,
	map,
	modify,
	negate,
	pathEq,
	pipe,
	propSatisfies,
	reduce,
	reject,
	subtract,
} from 'ramda';
import { type Readable, writable } from 'svelte/store';

interface CartItem {
	product: CategorizedProduct;
	count: number;
}

export interface CartModel {
	items: CartItem[];
	value: number;
}

export interface CartStore extends Readable<CartModel> {
	addItem(product: CategorizedProduct, amount?: number): void;

	removeItem(productId: string, amount?: number): void;
}

const productIdEquals = pathEq(['product', 'id']);
const calculateValue = reduce(
	(acc: number, item: CartItem) => acc + item.product.price * item.count,
	0
);

export function createCartStore(items: CartItem[] = []): CartStore {
	const innerStore = writable<CartModel>({
		items,
		value: calculateValue(items),
	});
	const { update, subscribe } = innerStore;

	return {
		subscribe,
		addItem(product: CategorizedProduct, amount = 1): void {
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

				return {
					items: model.items,
					value: calculateValue(model.items),
				};
			});
		},
		removeItem(productId: string, amount?: number): void {
			return update((model) => {
				const { items } = model;

				if (isNil(amount)) {
					const filteredItems = reject(productIdEquals(productId), items);
					return {
						items: filteredItems,
						value: calculateValue(filteredItems),
					};
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

				return {
					items: updatedItems,
					value: calculateValue(updatedItems),
				};
			});
		},
	};
}
