<script lang="ts">
	import { Button } from '@svelteuidev/core';
	import { getContext } from 'svelte';
	import { ChevronRight, Icon, MinusSm, PlusSm } from 'svelte-hero-icons';
	import type { Product } from '../../../lib/domain/Product';
	import type { CartStore } from '../../../lib/stores/cart';
	import { formatPrice } from '../../../lib/util/format.js';

	const cart = getContext<CartStore>('cart');
	const increase = (product: Product) => cart.addItem(product, 1);
	const decrease = (product: Product) => cart.removeItem(product.id, 1);
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
						<button class="left" on:click={() => decrease(item.product)}>
							<Icon src={MinusSm} size="1rem" color="rgb(28, 126, 214)"></Icon>
						</button>

						<span class="count">{item.count}</span>

						<button class="right" on:click={() => increase(item.product)}>
							<Icon src={PlusSm} size="1rem" color="rgb(28, 126, 214)"></Icon>
						</button>
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
			<Icon src={ChevronRight} size="1rem" slot="rightIcon" />
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

	button {
		margin: 0;
		padding: 0;
		width: 40px;
		height: 40px;
		border: 1px solid rgb(28, 126, 214);
		background-color: white;
		color: rgb(28, 126, 214);
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.left {
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}

	.right {
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}

	.count {
		display: flex;
		width: 40px;
		height: 40px !important;
		z-index: 2;
		background: white;
		border-top: 1px solid rgb(28, 126, 214);
		border-bottom: 1px solid rgb(28, 126, 214);
		box-sizing: border-box;
		color: rgb(28, 126, 214);
		justify-content: center;
		align-items: center;
	}

	.unit-price {
		text-align: center;
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
