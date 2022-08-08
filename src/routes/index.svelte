<script lang="ts">
  import type { Category } from '$lib/domain/Category';
  import { Card, Image, SimpleGrid } from '@svelteuidev/core';
  import type { Product } from '$lib/domain/Product';
  import { formatPrice } from '$lib/util/format';

  const Section = Card.Section;

  export let category: Category;
  export let products: Product[];
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
        <Section first padding="lg">
          <Image src="/products/{product.filename}" height={80} alt="" />
        </Section>
        <div class="card-content">
          <span class="brand">{product.brand}</span>
          <h2>
            <a href="/products/{product.id}" class="product-link"
              >{product.name}</a
            >
          </h2>
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

  .product-link {
    text-decoration: none;
    color: inherit;
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
