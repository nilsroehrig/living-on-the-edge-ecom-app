import categories from '$lib/data/categories.json';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = () => {
  const index = Math.floor(Math.random() * categories.length);

  return {
    body: {
      category: categories[index],
    },
  };
};
