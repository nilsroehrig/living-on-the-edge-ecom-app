import waitFor from 'wait-for-expect';
import type { Unsubscriber } from 'svelte/store';
import { type CartModel, type CartStore, createCartStore } from './cart';

const goldenSunglasses = {
	id: '3560da91-ad6a-4586-922d-301b4b929871',
	name: 'Golden Sunglasses',
	shortDescription:
		'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
	description:
		'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nDonec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.\n\nIn enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis.\n',
	price: 129900,
	brand: 'Glasseria',
	origin: 'Molvanîa',
	category: {
		id: '64de3109-dffe-4b66-bc7f-627983b5792d',
		slug: 'accessories',
		name: 'Accessories',
		hero: 'hero-accessories.jpg',
	},
	filename: 'accessories-sunglasses-golden.jpg',
};

const gameBoyColor = {
	id: 'ffc477fd-ac57-4856-836f-e40d54b01a66',
	name: 'Game Boy Color',
	shortDescription:
		'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
	description:
		'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nDonec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.\n\nIn enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis.\n',
	price: 25000,
	brand: 'Nintendo',
	origin: 'Japan',
	category: {
		id: 'c19af4a9-3811-4453-b30f-450ebf23488f',
		slug: 'technology',
		name: 'Technology',
		hero: 'hero-technology.jpg',
	},
	filename: 'technology-console-gbc.jpg',
};

const bodyOil = {
	id: '9b036bab-cbfb-4490-8db2-24ccaf9755df',
	name: "I'm Fabulous Body Oil",
	shortDescription:
		'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
	description:
		'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nDonec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.\n\nIn enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis.\n',
	price: 1795,
	brand: 'St Barth',
	origin: 'Molvanîa',
	category: {
		id: '0f52d345-4462-4348-8dcc-7d3a8dac0b70',
		slug: 'beauty',
		name: 'Beauty',
		hero: 'hero-beauty.jpg',
	},
	filename: 'beauty-oil-fabulous.jpg',
};

let cartData: CartModel, unsubscribe: Unsubscriber, store: CartStore;

function cleanUp() {
	unsubscribe();
	// @ts-ignore
	store = cartData = unsubscribe = undefined;
}

describe('adding items', () => {
	beforeEach(() => {
		store = createCartStore();
		unsubscribe = store.subscribe((data) => (cartData = data));
	});

	afterEach(cleanUp);

	it.each([-1, 0])('throws if amount is less or equal zero', (amount) => {
		expect(() => store.addItem(bodyOil, amount)).toThrow();
	})

	it('adds test item to cart store', async () => {
		store.addItem(goldenSunglasses);

		return waitFor(() => {
			expect(cartData.items).toEqual([{ product: goldenSunglasses, count: 1 }]);
		});
	});

	it('increases item count when product is already in cart', async () => {
		store.addItem(goldenSunglasses);
		store.addItem(goldenSunglasses, 2);

		return waitFor(() => {
			expect(cartData.items).toEqual([{ product: goldenSunglasses, count: 3 }]);
		});
	});

	it('adds different items to cart', async () => {
		store.addItem(goldenSunglasses);
		store.addItem(gameBoyColor);

		return waitFor(() => {
			expect(cartData.items).toEqual([
				{ product: goldenSunglasses, count: 1 },
				{ product: gameBoyColor, count: 1 },
			]);
		});
	});
});

describe('removing items', () => {
	beforeEach(async () => {
		store = createCartStore([
			{ product: goldenSunglasses, count: 3 },
			{ product: gameBoyColor, count: 3 },
		]);
		unsubscribe = store.subscribe((data) => (cartData = data));
	});

	afterEach(cleanUp);

	it('removes a single item from cart completely', async () => {
		store.removeItem(gameBoyColor.id);

		return waitFor(() => {
			expect(cartData.items).toEqual([{ product: goldenSunglasses, count: 3 }]);
		});
	});

	it('removes a specific amount of an item from cart', async () => {
		store.removeItem(gameBoyColor.id, 1);

		return waitFor(() => {
			expect(cartData.items).toEqual([
				{ product: goldenSunglasses, count: 3 },
				{ product: gameBoyColor, count: 2 },
			]);
		});
	});
});

describe('containing items', () => {
	beforeEach(async () => {
		store = createCartStore([
			{ product: goldenSunglasses, count: 3 },
			{ product: gameBoyColor, count: 3 },
		]);
		unsubscribe = store.subscribe((data) => (cartData = data));
	});

	afterEach(cleanUp);

	it('contains all cart items', () => {
		expect(cartData.items).toEqual([
			{ product: goldenSunglasses, count: 3 },
			{ product: gameBoyColor, count: 3 },
		]);
	});

	it('contains old and new cart items after adding', () => {
		store.addItem(bodyOil, 1);

		return waitFor(() => {
			expect(cartData.items).toEqual([
				{ product: goldenSunglasses, count: 3 },
				{ product: gameBoyColor, count: 3 },
				{ product: bodyOil, count: 1 },
			]);
		});
	});

	it('contains remaining cart items after removing', () => {
		store.removeItem(gameBoyColor.id);

		return waitFor(() => {
			expect(cartData.items).toEqual([{ product: goldenSunglasses, count: 3 }]);
		});
	});
});

describe('cart value', () => {
	beforeEach(async () => {
		store = createCartStore([
			{ product: goldenSunglasses, count: 3 },
			{ product: gameBoyColor, count: 3 },
		]);
		unsubscribe = store.subscribe((data) => (cartData = data));
	});

	it('calculates correct prize', () => {
		expect(cartData.value).toEqual(464700);
	});

	it('calculates correct prize after adding', () => {
		store.addItem(bodyOil, 1);
		return waitFor(() => {
			expect(cartData.value).toEqual(466495);
		});
	});

	it('calculates correct prize after removal', () => {
		store.removeItem(gameBoyColor.id);
		return waitFor(() => {
			expect(cartData.value).toEqual(389700);
		});
	});

	afterEach(cleanUp);
});
