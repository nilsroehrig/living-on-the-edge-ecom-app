import type { RequestHandler } from '@sveltejs/kit'
import categories from '$lib/data/categories.json'
import { CONTENT_TYPE, APPLICATION_JSON } from '$lib/constants/http'

export const get: RequestHandler = () => {
  return {
    status: 200,
    headers: {
      [CONTENT_TYPE]: APPLICATION_JSON,
    },
    body: { categories },
  }
}
