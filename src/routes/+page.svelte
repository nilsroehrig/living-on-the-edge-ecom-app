<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import type { Category } from '$lib/domain/Category';
	import type { Product } from '$lib/domain/Product';
	import { SimpleGrid } from '@svelteuidev/core';
	//import type { PageData } from './$types';

	// TODO: reinstate type import, once support in idea has landed
	export let data: any = {};
	let category: Category | undefined, products: Product[];

	$: ({ category, products } = data);
</script>

{#if category}
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
{/if}

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
