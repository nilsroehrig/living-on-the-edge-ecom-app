<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Icon, MinusSm, PlusSm, Trash } from 'svelte-hero-icons';

	export let count: number;

	const dispatch = createEventDispatcher()
	const increase = () => dispatch('increase')
	const decrease = () => dispatch('decrease')
</script>

<button class="left" on:click={decrease}>
	<Icon src={count === 1 ? Trash : MinusSm} size="1rem" color="rgb(28, 126, 214)"></Icon>
</button>

<span class="count">{count}</span>

<button class="right" on:click={increase}>
	<Icon src={PlusSm} size="1rem" color="rgb(28, 126, 214)"></Icon>
</button>

<style>

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
</style>
