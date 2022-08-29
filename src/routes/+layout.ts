import Cart from '$lib/components/Cart.svelte';
import type { Category } from '$lib/domain/Category';
import type { LayoutLoad } from '@sveltejs/kit';
import { Container, Group, SvelteUIProvider } from '@svelteuidev/core';

export const load: LayoutLoad = async ({ fetch }) => {
	const url = `/api/categories`;
	const response = await fetch(url);
	const { categories } = await response.json();

	throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
	return {
		status: response.status,
		props: { categories },
	};
};
