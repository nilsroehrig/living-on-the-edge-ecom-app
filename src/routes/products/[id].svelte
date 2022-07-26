<script lang="ts">
  import type { Product } from '$lib/domain/Product';
  import { formatPrice } from '$lib/util/format';

  export let product: Product;

  const { category } = product;
</script>

<picture>
  <img class="image" alt="" src="/products/{product.filename}" />
</picture>
<div class="info">
  <div class="vendor">{product.brand}</div>
  <h2 class="title">{product.name}</h2>
  <div class="price">{formatPrice(product.price)}</div>
  {#if category && typeof category !== 'string'}
    <div class="category">{category.name}</div>
  {/if}
  <div class="origin">{product.origin}</div>
</div>
