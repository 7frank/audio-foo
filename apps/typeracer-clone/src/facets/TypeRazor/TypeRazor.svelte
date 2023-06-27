<script lang="ts">
	import ResultChart from '../../components/ResultChart.svelte';
	import { racingStore } from '../RacingHistory/store';
	import CountDown from './CountDown.svelte';
	import { QuoteLoader, isRandomQuote } from './IQuoteLoader';
	import ProgressBar from './ProgressBar.svelte';
	import { Race } from './Race';

	export let quoteId: string = 'random';

	const race = new Race(new QuoteLoader(quoteId), racingStore);
	// TODO constructor is currently not initializing
	race.reset();

	if (!isRandomQuote(quoteId)) race.start();

	let ref: HTMLInputElement;

	// TODO is this a proper way to run effects?
	$: $race.status && setTimeout(() => ref?.focus(), 10);
</script>

{#if $race.status == 'countdown'}
	<div class="box">
		<CountDown>
			<h1 class="racing">
				Race starts in {(Math.round($race.countDown * 100) / 100).toFixed(2)}
			</h1>
		</CountDown>
	</div>
{/if}

{#if $race.status == 'started' && $race.elapsedMs < 1000}
	<div
		class="box"
		style="transform: scale({1 + $race.elapsedMs / 1000}); opacity:{1 - $race.elapsedMs / 1000}"
	>
		<CountDown>
			<h1 class="racing">GO!!</h1>
		</CountDown>
	</div>
{/if}

<div class="dialog">
	{#if $race.status == 'idle' || $race.status == 'succeeded' || $race.status == 'failed' || $race.status == 'aborted'}
		<button class="racing" on:click={() => $race.start()}>Start a new Race</button>
	{/if}

	{#if $race.status == 'succeeded'}
		<img src="https://www.w3schools.com/tags/smiley.gif" alt="Smiley face" height="42" width="42" />
	{/if}

	<ProgressBar
		isBotEnabled={false}
		userName={'7frank'}
		progress={($race.diffPos / $race.text.content.length) * 100}
		wpm={$race.wpm}
		isStreetAnimated={$race.status == 'started'}
	/>

	{#if $race.status != 'idle'}
		<ProgressBar
			isBotEnabled={$race.status == 'started'}
			isStreetAnimated={$race.status == 'started'}
		/>
		<ProgressBar
			isBotEnabled={$race.status == 'started'}
			isStreetAnimated={$race.status == 'started'}
		/>
		<ProgressBar
			isBotEnabled={$race.status == 'started'}
			isStreetAnimated={$race.status == 'started'}
		/>
		<ProgressBar
			isBotEnabled={$race.status == 'started'}
			isStreetAnimated={$race.status == 'started'}
		/>
	{/if}

	<p class="text">
		{#if $race.status == 'idle'}
			Welcome TypeRazor, let's start a new race and bring you to the top!<br />
			Press the start button when ready.
		{/if}
		{#if $race.status != 'idle'}
			{#each $race.text.content.split('') as item, i (i)}
				<span
					style="background-color: {i < $race.diffPos
						? 'lightgreen'
						: i < $race.currentCursorPos && $race.diffPos < $race.currentCursorPos
						? 'red'
						: 'white'};">{item}</span
				>
			{/each}
		{/if}
	</p>
	<input bind:this={ref} bind:value={$race.userInput} disabled={!$race.isTyping} />

	<ResultChart />
</div>

<style>
	input {
		resize: none;
		padding: 0.5em;
		font-size: 2rem;
		margin: 0 0em;
		margin-bottom: 1em;
	}

	.text {
		font-size: 2rem;

		height: auto;
		min-height: 200px;

		border: 1px solid grey;
		padding: 1em;
		background-color: white;
	}

	.box {
		position: absolute;
		top: 3em;
	}

	.racing {
		margin: 1em;
		font-size: 2em;
		font-family: 'Racing Sans One', sans-serif;
	}

	button {
		padding: 0.5em;
	}

	.dialog {
		display: flex;
		flex-direction: column;
		width: 90%;
	}
</style>
