<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {
    const randomCategoryUrl = `/api/categories/random`;
    const featuredProductsUrl = '/api/products/featured';

    const randomCategoryPromise = fetch(randomCategoryUrl);
    const featuredProductPromise = fetch(featuredProductsUrl);

    const [randomCategoryResponse, featuredProductsResponse] =
      await Promise.all([randomCategoryPromise, featuredProductPromise]);

    const { category } = await randomCategoryResponse.json();
    const { products } = await featuredProductsResponse.json();

    return {
      props: { category, products },
    };
  };
</script>

<script lang="ts">
  import type { CategoryJson } from '$lib/domain/category';
  import type { ProductJson } from '$lib/domain/product';
  import { Card, Image, SimpleGrid, Text } from '@svelteuidev/core';

  const formatPrice = (price: number) => `€ ${(price / 100).toFixed(2)}`;

  export let category: CategoryJson;
  export let products: ProductJson[];
</script>

<a
  href="/categories/{category.slug}"
  class="hero"
  style:background-image={`url(/hero/${category.hero})`}
>
  <span>
    Explore all our awesome products within the <strong>{category.name}</strong>
    category!
  </span>
</a>

<div class="featured-products">
  <SimpleGrid
    cols={2}
    breakpoints={[{ minWidth: 768, cols: 3, spacing: 'md' }]}
  >
    {#each products as product}
      <Card shadow="sm" p="lg">
        <Card.Section first padding="lg">
          <Image src="/products/{product.filename}" height={80} alt="" />
        </Card.Section>
        <div class="card-content">
          <span class="brand">{product.brand}</span>
          <h2>{product.name}</h2>
          <span class="price">{formatPrice(product.price)}</span>
        </div>
      </Card>
    {/each}
  </SimpleGrid>
</div>

<style>
  .hero {
    margin-left: -1rem;
    width: calc(100% + 2rem);
    min-height: 300px;
    background-size: cover;
    display: flex;
    padding: 1rem;
    box-sizing: border-box;
    justify-content: flex-start;
    align-items: flex-end;
    text-decoration: none;
    color: black;
  }

  .hero span {
    border-radius: 0.25rem;
    padding: 0.5rem;
    background-color: rgba(255, 255, 255, 0.85);
    font-size: 2rem;
    font-weight: 300;
  }

  .hero strong {
    font-weight: 700;
  }

  .featured-products {
    margin: 2rem 0;
  }

  .card-content {
    text-align: center;
    margin: 1rem 0 0;
  }

  .brand {
    text-transform: uppercase;
    font-size: 0.85rem;
    line-height: calc(16 / 14);
    color: #666;
    font-weight: 400;
  }

  h2 {
    font-size: 1rem;
    margin: 0.5rem 0;
    font-weight: 700;
  }

  .price {
    margin: 0;
    font-weight: 700;
    font-size: calc(18rem / 16);
    line-height: calc(24 / 18);
  }
</style>
