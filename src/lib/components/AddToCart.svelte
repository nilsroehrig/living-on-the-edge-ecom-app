<script lang="ts">
	import { Button } from '@svelteuidev/core';
	import { getContext } from 'svelte';
	import { Icon, MinusSm, PlusSm, ShoppingCart } from 'svelte-hero-icons';
	import type { Product } from '../domain/Product';
	import type { CartStore } from '../stores/cart';

	function checkCount (c: number) {
		return c >= 0 && /^(([1-9]\d*)(\d*))$/.test(String(c));
	}

	const cart = getContext<CartStore>('cart');

	export let product: Product;
	export let showAmountHandler = true;

	let count = 1;
	let oldCount = count;

	$: if (typeof count !== 'number') {
		count = Number(count);
	}

	$: if (checkCount(count)) {
		oldCount = count;
	} else {
		count = oldCount;
	}

	const decrease = () => count = Number(count) - 1;
	const increase = () => count = Number(count) + 1;
	const addToCart = () => {
		cart.addItem(product, count);
		count = 1;
	};
</script>

<div class="add-to-cart">
	<!--{#if showAmountHandler}-->
	<!--	<div class="amount-handler">-->
	<!--		<Button on:click={decrease} compact>-->
	<!--			<Icon src={MinusSm} size=".75rem"></Icon>-->
	<!--		</Button>-->

	<!--		<input class="count" type="text" bind:value={count}/>-->

	<!--		<Button on:click={increase} compact>-->
	<!--			<Icon src={PlusSm} size=".75rem"></Icon>-->
	<!--		</Button>-->
	<!--	</div>-->
	<!--{/if}-->
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

	.amount-handler {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	input {
		height: 2rem;
		width: 2rem;
		text-align: center;
		padding: 0;
		margin: 0 .5rem;
		border-radius: .25rem;
		border: solid thin #DDD;
	}
</style>
