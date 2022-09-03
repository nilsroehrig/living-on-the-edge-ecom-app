<script lang="ts">
	import DefaultGrid from '$lib/components/layout/DefaultGrid.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import type { Category } from '$lib/domain/Category';
	import type { ProductWithCategory } from '$lib/domain/Product';
	// import type { PageData } from './$types';

	// TODO: reinstate type import, once support in idea has landed
	export let data: any = {};
	let category: Category, products: ProductWithCategory[];

	$: ({ category, products } = data);
</script>

<section>
	<h1>{category.name}</h1>
	<DefaultGrid>
		{#each products as product}

			<ProductCard {product}/>

		{:else}
			<p>There are no products in this category yet.</p>
		{/each}
	</DefaultGrid>
</section>
