<script lang="ts">
	import { racingStore } from './store';
</script>

History:
<table>
	<tr>
		<th>id</th>
		<th>createdAt</th>
		<th>textId</th>
		<th>author</th>
		<th>wpm</th>
		<th />
	</tr>
	{#each $racingStore.history as entry, i (i)}
		<tr>
			<td>{i}</td>
			<td>{entry.createdAt?new Date(entry.createdAt).toISOString():""}</td>
			<td>{entry._id}</td>
			<td>{entry.author}</td>
			<td>{entry.wpm}</td>
			<td><a href="/play/{entry._id}">Try Again</a></td>
		</tr>
	{/each}
</table>


<style>

table,tr,td,th{
padding:0.5em;

}


table{
    font-size: 2em;
	font-family: 'Racing Sans One', sans-serif;
    background-color: rgba(255,255,255,0.6);
}

</style>
