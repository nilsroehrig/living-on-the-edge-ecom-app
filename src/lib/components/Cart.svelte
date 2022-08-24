<script lang="ts">
	import { Icon, ShoppingCart } from 'svelte-hero-icons';

	export let cartValue: number = 0;

	$: formattedCartValue = `${(cartValue / 100).toFixed(2)} €`;
</script>

<a href="/checkout/cart">
	<span class="value">{formattedCartValue}</span>
	<Icon src={ShoppingCart} size="1.5rem"/>
</a>

<style>
	a {
		display: flex;
		font-size: 1rem;
		line-height: 1;
		align-items: center;
		color: black;
		text-decoration: none;
	}

	.value {
		margin-right: 0.5rem;
	}
</style>
