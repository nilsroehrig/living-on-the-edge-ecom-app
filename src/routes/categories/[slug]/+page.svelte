<script lang="ts">
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import DefaultGrid from '../../../lib/components/layout/DefaultGrid.svelte';
	import ProductCard from '../../../lib/components/ProductCard.svelte';
	import type { Category } from '../../../lib/domain/Category';
	import type { CategorizedProduct } from '../../../lib/domain/Product';

	export let category: Category;
	export let products: CategorizedProduct[];
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
