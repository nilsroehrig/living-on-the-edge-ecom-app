<script lang="ts">
	import { Card, Image } from '@svelteuidev/core';
	import { formatPrice } from '../util/format.js';
	import type { Product } from '$lib/domain/Product';

	const Section = Card.Section;

	export let product: Product;
</script>

<Card shadow="sm" p="lg">
	<Section first padding="lg">
		<Image src="/products/{product.filename}" height={80} alt=""/>
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

<style>
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
