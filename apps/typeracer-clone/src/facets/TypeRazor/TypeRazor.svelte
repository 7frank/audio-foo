<script lang="ts">
	import { onMount } from 'svelte';
	import ResultChart from '../../components/ResultChart.svelte';
	import { racingStore,stubRacingStore } from '../RacingHistory/store';
	import CountDown from './CountDown.svelte';
	import {
		RandomQuoteLoader,
		FromIdRandomQuoteLoader,
		TrainWeakWordsQuoteLoader
	} from './IQuoteLoader';
	import ProgressBar from './ProgressBar.svelte';
	import { Race } from './Race';

	export let mode: 'random' | 'weak-words'|"id" = 'random';
	export let quoteId: string = 'random';
	let race: Race;
	switch (mode) {
		case 'random': {
			race = new Race(new RandomQuoteLoader(), racingStore);
			// TODO constructor is currently not initializing
			race.reset();
			break;
		}
		case 'weak-words': {
			race = new Race(new TrainWeakWordsQuoteLoader(), stubRacingStore);
			// TODO constructor is currently not initializing
			race.reset();
			race.start();
			break;
		}
		default: {
			race = new Race(new FromIdRandomQuoteLoader(quoteId), racingStore);
			// TODO constructor is currently not initializing
			race.reset();
			race.start();
			break;
		}
	}

	onMount(() => {
		return () => {
			console.log('Race was aborted');
			race.stop('aborted');
		};
	});

	let ref: HTMLInputElement;

	/**
	 * We delay focusing the text area here.
	 *
	 * TODO is this a proper way to run effects?
	 */
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

<div class="dialog card p-4">
	<div class="flex items-center justify-center">
		{#if $race.status == 'succeeded'}
			<img
				class="success-image"
				src="https://24.media.tumblr.com/tumblr_m8szg9MgFa1qgfnmko1_500.gif"
				alt="Smiley face"
			/>
		{/if}

		{#if $race.status == 'idle' || $race.status == 'succeeded' || $race.status == 'failed' || $race.status == 'aborted'}
			<button class="racing" on:click={() => $race.start()}>Start a new Race</button>
		{/if}

		{#if $race.status == 'succeeded'}
			<img
				class="success-image"
				src="https://24.media.tumblr.com/tumblr_m8szg9MgFa1qgfnmko1_500.gif"
				alt="Smiley face"
			/>
		{/if}
	</div>

	<div class="card p-4">
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
	</div>

	<p class="text mt-5 card p-4">
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
	<input
		class="card p-4"
		placeholder=""
		bind:this={ref}
		bind:value={$race.userInput}
		on:keyup={() => $race.run()}
		disabled={!$race.isTyping}
	/>

	<ResultChart />
</div>

<style>
	input {
		resize: none;
		padding: 0.5em;
		font-size: 2rem;
		margin: 0.5em 0;
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
		background-color: rgba(255, 255, 255, 0.3);
	}
	.success-image {
		height: 200px;
	}
</style>
