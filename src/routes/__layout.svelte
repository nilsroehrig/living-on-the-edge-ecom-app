<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

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
  import Cart from '$lib/components/Cart.svelte';
  import type { CategoryJson } from '$lib/domain/Category';
  import { Container, Group } from '@svelteuidev/core';
  import { SvelteUIProvider } from '@svelteuidev/core';

  export let categories: CategoryJson[];
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
</style>
