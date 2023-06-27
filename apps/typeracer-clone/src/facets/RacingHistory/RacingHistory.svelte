<script lang="ts">
	import { racingStore } from './store';
</script>

History:
<div class="table-container">
<table class="table table-hover">
	<thead>	<tr>
		<th>id</th>
		<th>createdAt</th>
		<th>textId</th>
		<th>author</th>
		<th>wpm</th>
		<th />
	</tr></thead>
	<tbody>
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
</tbody>
</table></div>


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
