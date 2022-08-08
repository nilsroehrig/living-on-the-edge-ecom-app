import products from '$lib/data/products.json';
import categories from '$lib/data/categories.json';

import type { RequestHandler } from '@sveltejs/kit';
import { APPLICATION_JSON, CONTENT_TYPE } from '$lib/constants/http';
import showdown from 'showdown';

const converter = new showdown.Converter();

export const get: RequestHandler = async ({ params }) => {
  const product = products.find((p) => p.id === params.id);

  if (typeof product === 'undefined') {
    return { status: 404 };
  }

  const { description, category: categoryId, ...rest } = product;
  const category = categories.find((c) => c.id === categoryId);

  return {
    status: 200,
    headers: {
      [CONTENT_TYPE]: APPLICATION_JSON,
    },
    body: {
      product: {
        ...rest,
        category: {
          ...category,
        },
        description: converter.makeHtml(product.description),
      },
    },
  };
};
