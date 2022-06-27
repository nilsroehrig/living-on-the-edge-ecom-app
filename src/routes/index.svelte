<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {
    const url = `/api/categories/random`;
    const response = await fetch(url);
    const { category } = await response.json();

    return {
      status: response.status,
      props: { category },
    };
  };
</script>

<script lang="ts">
  import type { Category } from '$lib/sharedtypes/category';

  export let category: Category;
</script>

<a href="/categories/{category.slug}" class="hero" style:background-image={`url(/hero/${category.hero})`}>
  <span>
    Explore all our awesome products within the <strong>{category.name}</strong> category!
  </span>
</a>

<style>
  .hero {
    margin-left: -1rem;
    width: calc(100% + 2rem);
    min-height: 300px;
    background-size: cover;
    display: flex;
    padding: 1rem;
    box-sizing: border-box;
    justify-content: flex-start;
    align-items: flex-end;
    text-decoration: none;
    color: black;
  }

  .hero span {
    border-radius: 0.25rem;
    padding: .5rem;
    background-color: rgba(255, 255, 255, 0.85);
    font-size: 2rem;
    font-weight: 300;
  }

  .hero strong {
    font-weight: 700;
  }
</style>
