<script lang="ts">
	import { racingStore } from './store';
</script>

<h1 class="h1 m-4 racing">- History -</h1>
<div class="table-container">
	<table class="table racing table-hover">
		<thead>
			<tr>
				<th>id</th>
				<th>createdAt</th>
				<th>textId</th>
				<th>author</th>
				<th>wpm</th>
				<th />
			</tr></thead
		>
		<tbody>
			{#each $racingStore.history as entry, i (i)}
				<tr>
					<td>{i}</td>
					<td>{entry.createdAt ? new Date(entry.createdAt).toISOString() : ''}</td>
					<td>{entry._id}</td>
					<td>{entry.author}</td>
					<td>{entry.wpm}</td>
					<td><a href="/play/{entry._id}">Try Again</a></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>




<h1 class="h1 m-4 racing">- Spelling errors -</h1>
<div class="table-container">
	<table class="table racing table-hover">
		<thead>
			<tr>
				<th>id</th>
				<th>createdAt</th>
				<th>textId</th>
				<th>author</th>
				<th>wpm</th>
				<th />
			</tr></thead
		>
		<tbody>
			{#each $racingStore.spellingErrors as entry, i (i)}
				<tr>
					<td>{i}</td>
					<td>{entry.word}</td>
					<td>{entry.severity}</td>
					<td>{entry.createdAt ? new Date(entry.createdAt).toISOString() : ''}</td>
					<td><a href="#todo">train words</a></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>


<style>
	table,
	tr,
	td,
	th {
		padding: 0.5em;
	}

	.racing {
		font-family: 'Racing Sans One', sans-serif;
	}
	table {
		font-size: 2em;

		background-color: rgba(255, 255, 255, 0.6);
	}
</style>
