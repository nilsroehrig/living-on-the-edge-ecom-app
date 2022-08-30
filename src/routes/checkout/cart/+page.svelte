<script lang="ts">
	import { Button } from '@svelteuidev/core';
	import { getContext } from 'svelte';
	import { ChevronRight, Icon } from 'svelte-hero-icons';
	import AmountHandler from '../../../lib/components/AmountHandler.svelte';
	import type { CartStore } from '../../../lib/stores/cart';
	import { formatPrice } from '../../../lib/util/format.js';

	const cart = getContext<CartStore>('cart');
</script>
<h1>Cart</h1>
{#if cart.hasItems()}
	<ul>
		{#each $cart.items as item}
			<li>
				<a class="info" href="/products/{item.product.id}">
					<img src="/products/{item.product.filename}" alt=""/>
					<h2>{item.product.name}</h2>
				</a>
				<div class="price">
					<div class="amount-handler">
						<AmountHandler
							count="{item.count}"
							on:increase={() => cart.addItem(item.product, 1)}
							on:decrease={() => cart.removeItem(item.product.id, 1)}
						/>
					</div>
					<div class="unit-price">Unit <span>{formatPrice(item.product.price)}</span></div>
					<div class="total-price">Total <span>{formatPrice(item.product.price * item.count)}</span></div>

				</div>
			</li>
		{/each}
	</ul>
	<div class="total">
		Total
		<span class="amount">{formatPrice($cart.value)}</span>
	</div>
	<div class="checkout">
		<Button size="md">
			Proceed to checkout
			<Icon src={ChevronRight} size="1rem" slot="rightIcon"/>
		</Button>
	</div>
{/if}

<style>
	ul {
		padding: 0;
		margin: 1rem 0;
		display: flex;
		flex-direction: column;
	}

	li {
		list-style: none;
		margin: 0 0 1rem -1rem;
		padding: 1rem 1rem 0;
		width: 100%;
		box-shadow: inset 0 1px 0 0 #f0f0f0;
	}

	.info {
		display: flex;
		gap: 1rem;
		color: inherit;
		text-decoration: none;
	}

	img {
		width: 3rem;
		height: 3rem;
	}

	h2 {
		font-size: 1rem;
		line-height: 1.5;
	}

	.total {
		display: flex;
		justify-content: space-between;
		font-weight: bold;
		width: 100%;
		margin: 0 0 1rem -1rem;
		padding: 1rem 1rem 0;
		box-shadow: inset 0 1px 0 0 #f0f0f0;
	}

	.price {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin: 1rem 0 0;
	}

	.amount-handler {
		width: 40%;
		display: flex;
	}

	.unit-price {
		text-align: right;
	}

	.total-price {
		text-align: right;
	}

	.unit-price, .total-price {
		width: 30%;
		font-size: .85rem;
		line-height: 1rem;
	}

	.unit-price span, .total-price span {
		display: block;
		font-size: 1rem;
		line-height: 1.5;
		font-weight: bold;
	}

	.checkout {
		margin: 2rem 0 1rem;
		display: flex;
		justify-content: center;
	}
</style>
