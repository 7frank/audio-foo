<script lang="ts">
	import { racingStore } from './store';
</script>

History:
<table>
	<tr>
		<th>id</th>
		<th>author</th>
		<th>wpm</th>
		<th />
	</tr>
	{#each $racingStore.history as entry, i (i)}
		<tr>
			<td>{i}</td><td>{entry._id}</td>
			<td>{entry.author}</td>
			<td>{entry.wpm}</td>
			<td><button>Try Again</button></td>
		</tr>
	{/each}
</table>
