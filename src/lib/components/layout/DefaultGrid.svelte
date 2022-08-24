<script>
	import { SimpleGrid } from '@svelteuidev/core';
</script>

<SimpleGrid
	cols={2}
	breakpoints={[{ minWidth: 768, cols: 3, spacing: 'md' }]}
>
	<slot/>
</SimpleGrid>
