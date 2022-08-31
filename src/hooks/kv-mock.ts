import { KVNamespace } from '@miniflare/kv';
import { MemoryStorage } from '@miniflare/storage-memory';
import products from '$lib/data/products.json';
import categories from '$lib/data/categories.json';

export const productStore = new KVNamespace(new MemoryStorage());
export const categoryStore = new KVNamespace(new MemoryStorage());
export const contentStore = new KVNamespace(new MemoryStorage());

await Promise.all([
	...products.map((product) =>
		productStore.put(product.id, JSON.stringify(product))
	),

	...categories.map((category) =>
		categoryStore.put(category.id, JSON.stringify(category))
	),

	contentStore.put(
		'featuredIds',
		JSON.stringify([
			'3560da91-ad6a-4586-922d-301b4b929871', // golden sunglasses
			'ffc477fd-ac57-4856-836f-e40d54b01a66', // gbc
			'350739db-c208-4f07-8e61-a292105a1a5f', // green tea serum
			'cefccce0-9d15-4711-b662-0e73cf07619e', // watch
			'859e1663-b7df-49e1-807e-71416ecdabbc', // ipad
			'98acf652-8a3d-451e-9342-42f982db46e0', // kinn lotion
		])
	),
]);
