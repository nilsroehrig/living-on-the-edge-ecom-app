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

describe('adding items', () => {
  let storeData: CartModel, unsubscribe: Unsubscriber, store: CartStore;

  beforeEach(() => {
    store = createCartStore();
    unsubscribe = store.subscribe((data) => (storeData = data));
  });

  it('adds test item to cart store', async () => {
    await store.addItem({ product: goldenSunglasses, count: 1 });

    return waitFor(() => {
      expect(storeData).toEqual({
        items: [{ product: goldenSunglasses, count: 1 }],
      });
    });
  });

  it('increases item count when product is already in cart', async () => {
    await store.addItem({ product: goldenSunglasses, count: 1 });
    await store.addItem({ product: goldenSunglasses, count: 2 });

    return waitFor(() => {
      expect(storeData).toEqual({
        items: [{ product: goldenSunglasses, count: 3 }],
      });
    });
  });

  it('adds different items to cart', async () => {
    await store.addItem({ product: goldenSunglasses, count: 1 });
    await store.addItem({ product: gameBoyColor, count: 1 });

    return waitFor(() => {
      expect(storeData).toEqual({
        items: [
          { product: goldenSunglasses, count: 1 },
          { product: gameBoyColor, count: 1 },
        ],
      });
    });
  });

  afterEach(() => {
    unsubscribe();
  });
});
