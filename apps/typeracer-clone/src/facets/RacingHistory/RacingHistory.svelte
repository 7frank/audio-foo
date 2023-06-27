<script lang="ts">
	import { racingStore } from './store';
</script>

History:
{#each $racingStore.history as entry, i (i)}
	<tr><td>{i}</td><td>{entry}</td></tr>
{/each}
