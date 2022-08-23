<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Icon, MinusSm, PlusSm, ShoppingCart } from 'svelte-hero-icons';
	import { Button } from '@svelteuidev/core';

	function checkCount (c: number) {
		return c >= 0 && /^(([1-9]\d*)(\d*))$/.test(String(c));
	}

	const dispatch = createEventDispatcher();

	export let productId = '1';

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
		dispatch('add_to_cart_clicked', { productId, count });
		count = 1;
	};
</script>

<div class="add-to-cart">
	<div class="amount-handler">
		<Button on:click={decrease} compact>
			<Icon src={MinusSm} size=".75rem"></Icon>
		</Button>


		<input class="count" type="text" bind:value={count}/>


		<Button on:click={increase} compact>
			<Icon src={PlusSm} size=".75rem"></Icon>
		</Button>
	</div>
	<Button class="add-to-cart-button" on:click={addToCart}>
		<Icon src="{ShoppingCart}" size="1rem" slot="leftIcon"/>
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
