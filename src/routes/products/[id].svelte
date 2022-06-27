<script lang="ts">
  import type { Product } from '$lib/sharedtypes/product'

  export let product: Product
</script>

{#if product == null}
  Das gewünschte Produkt wurde nicht gefunden.
{:else}
  Das gewünschte Produkt ist vorhanden.
{/if}
