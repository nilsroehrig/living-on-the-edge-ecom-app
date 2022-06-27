import products from '$lib/data/products.json'
import categories from '$lib/data/categories.json'

import type { RequestHandler } from '@sveltejs/kit'
import { APPLICATION_JSON, CONTENT_TYPE } from '$lib/constants/http'

export const get: RequestHandler = ({ params }) => {
  const product = products.find((p) => p.id === params.id)

  if (typeof product === 'undefined') {
    return { status: 404 }
  }

  const category = categories.find((c) => c.id === product.category)

  return {
    status: 200,
    headers: {
      [CONTENT_TYPE]: APPLICATION_JSON,
    },
    body: {
      product: {
        ...product,
        category: {
          ...category,
        },
      },
    },
  }
}
