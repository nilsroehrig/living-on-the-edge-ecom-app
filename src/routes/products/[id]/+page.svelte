<script lang="ts">
	import type { Product } from '$lib/domain/Product';
	import { formatPrice } from '$lib/util/format';
	import { Badge, Card } from '@svelteuidev/core';
	import AddToCart from '$lib/components/AddToCart.svelte';
	import type { Category } from '$lib/domain/Category';
	// import type { PageData } from './$types';

	const Section = Card.Section;

	// TODO: reinstate type import, once support in idea has landed
	export let data: any = {};
	let product: Product, category: Category | string | undefined;

	$: ({ product } = data);
	$: ({ category } = product);

</script>

<article>
	<Card>
		<Section first>
			<img class="image" alt="" src="/products/{product.filename}"/>
		</Section>
	</Card>

	<div class="info">
		{#if category && typeof category !== 'string'}
			<Badge>{category.name}</Badge>
		{/if}
		<h2 class="title">{product.brand} {product.name}</h2>
		<p class="short-description">{product.shortDescription}</p>
		<div class="price">{formatPrice(product.price)}</div>
		<AddToCart {product}/>
		<div class="description">
			<p class="origin">Country of origin: {product.origin}</p>
			{@html product.description}
		</div>
	</div>
</article>

<style>
	article {
		margin: 1rem 0;
	}

	.image {
		width: 100%;
		display: block;
	}

	.info {
		line-height: 1.5;
		margin: 1rem 0;
	}

	.title {
		margin: 1rem 0;
	}

	.price {
		display: block;
		font-size: 1.5rem;
		line-height: 1;
		font-weight: bold;
		margin: 1rem 0;
		padding-bottom: 1rem;
		box-shadow: inset 0 -1px 0 0 #DDD;
	}

	.description {
		box-shadow: inset 0 1px 0 0 #DDD;
		padding-top: 1rem;
		margin-top: 1rem;
	}

	.origin {
		margin-top: 0;
	}

	p {
		margin: 1rem 0;
	}
</style>
