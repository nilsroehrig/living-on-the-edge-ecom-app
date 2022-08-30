<script lang="ts">
	import { Button } from '@svelteuidev/core';
	import { getContext } from 'svelte';
	import { Icon, ShoppingCart } from 'svelte-hero-icons';
	import type { Product } from '../domain/Product';
	import type { CartStore } from '../stores/cart';

	const cart = getContext<CartStore>('cart');

	export let product: Product;

	const addToCart = () => {
		cart.addItem(product, 1);
	};
</script>

<div class="add-to-cart">
	<Button class="add-to-cart-button" on:click={addToCart} size="lg" fullSize>
		<Icon src="{ShoppingCart}" size="1.5rem" slot="leftIcon"/>
		Add to cart
	</Button>
</div>

<style>
	.add-to-cart {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
