<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import Cart from '$lib/components/Cart.svelte';
  import type { Category } from '$lib/sharedtypes/category';
  import { Container, Group, SvelteUIProvider } from '@svelteuidev/core';

  export const load: Load = async ({ fetch }) => {
    const url = `/api/categories`;
    const response = await fetch(url);
    const { categories } = await response.json();

    return {
      status: response.status,
      props: { categories },
    };
  };
</script>

<script lang="ts">
  export let categories: Category[];
</script>

<SvelteUIProvider ssr>
  <header>
    <Container>
      <Group position="apart">
        <div class="brand">svekom</div>
        <div class="cart"><Cart /></div>
      </Group>
    </Container>
  </header>
  <nav>
    <Container>
      <Group position="apart" align="center">
        {#each categories as category}
          <a href="/categories/{category.slug}">{category.name}</a>
        {/each}
      </Group>
    </Container>
  </nav>
  <Container><slot /></Container>
  <footer>&copy; 2022 Svekom Enterprises</footer>
</SvelteUIProvider>

<style>
  header,
  nav {
    box-shadow: inset 0 -1px 0 0 #f0f0f0;
  }

  nav a {
    line-height: 4.57142;
    font-size: 0.85rem;
    text-transform: uppercase;
    text-decoration: none;
    color: black;
  }

  .brand {
    padding: 1.5rem 0;
    font-size: 2rem;
    font-weight: 900;
    line-height: 1;
    transform: translateY(-1px);
  }

  .cart {
    transform: translateY(2px);
  }

  footer {
    box-shadow: inset 0 1px 0 0 #f0f0f0;
    padding: 1rem;
    text-align: center;
    line-height: 1.5;
  }
</style>
