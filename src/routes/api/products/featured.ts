import products from '$lib/data/products.json';
import type { RequestHandler } from '@sveltejs/kit';

const featuredIds = [
  '3560da91-ad6a-4586-922d-301b4b929871', // golden sunglasses
  'ffc477fd-ac57-4856-836f-e40d54b01a66', // gbc
  '350739db-c208-4f07-8e61-a292105a1a5f', // green tea serum
  'cefccce0-9d15-4711-b662-0e73cf07619e', // watch
  '859e1663-b7df-49e1-807e-71416ecdabbc', // ipad
  '98acf652-8a3d-451e-9342-42f982db46e0', // kinn lotion
];

export const get: RequestHandler = async () => {
  return {
    body: {
      products: products.filter((product) => featuredIds.includes(product.id)),
    },
  };
};
