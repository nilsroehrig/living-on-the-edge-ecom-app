import type { RequestHandler } from '@sveltejs/kit';
import { APPLICATION_JSON, CONTENT_TYPE } from '$lib/constants/http';
import { createProductService } from '$lib/services/ProductService';

export const get: RequestHandler = async ({ params }) => {
  const service = createProductService();
  const productOption = await service.getOne(params.id);

  return productOption
    .map<ReturnType<RequestHandler>>((product) => ({
      status: 200,
      headers: {
        [CONTENT_TYPE]: APPLICATION_JSON,
      },
      body: {
        product: JSON.stringify(product.serialize()),
      },
    }))
    .getOrElse({ status: 404 });
};
