<script lang="ts">
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import type { Category } from '$lib/domain/Category';
	import type { Product } from '$lib/domain/Product';
	import { SimpleGrid } from '@svelteuidev/core';
	import ProductCard from '../lib/components/ProductCard.svelte';

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
			<ProductCard {product}/>
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
</style>
