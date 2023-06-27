<script lang="ts">
	import ResultChart from '../../components/ResultChart.svelte';
	import CountDown from './CountDown.svelte';
	import ProgressBar from './ProgressBar.svelte';
	import { Race } from './store';
	import { loremIpsum, stuff } from './text';
	import { loadRandomQuote } from './textStore';
	import { findFirstDifference } from './utils';

	const race = new Race();

	let ref: HTMLInputElement;

	function focusInput() {
		// focus fix
		setTimeout(() => ref.focus(), 10);
	}

	const fps = 60;
	const updateInterval = 1000 / fps;

	function onCountDownTick() {
		$race.countDown -= 1 / fps;

		if (!$race.isTyping && $race.countDown <= 0) {
			$race.isTyping = true;
			$race.startTime = new Date();
			$race.interval = setInterval(() => run(), updateInterval);
			$race.userInput = '';

			focusInput();

			$race.status = 'started';

			clearInterval($race.countDownTimerId);
		}
	}

	function delay(time: number) {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, time);
		});
	}

	async function start() {
		loadMoreText();

		$race.status = 'idle';
		$race.diffPos = 0;
		$race.wpm = 0;
		await delay(50);

		$race.countDown = 3;
		$race.status = 'countdown';
		$race.countDownTimerId = setInterval(onCountDownTick, updateInterval);
	}

	function stop(reason: Race['status']) {
		if ($race.isTyping) {
			$race.isTyping = false;
			$race.endTime = new Date();
			clearInterval($race.interval!);
			calculateWPM($race.endTime);
		}

		$race.status = reason;
	}

	function run() {
		// Perform any additional logic during the typing practice interval
		// For example, you can track user input and update the displayed text.

		calculateWPM(new Date());
		const { diffPos: _d, isSame } = findFirstDifference($race.text, $race.userInput);
		$race.diffPos = _d;
		$race.currentCursorPos = $race.userInput.length;

		if (isSame) {
			stop('succeeded');
		}
	}

	function calculateWPM(t: Date) {
		const millisecondsElapsed = t.getTime() - $race.startTime.getTime();
		$race.elapsedMs = millisecondsElapsed;

		const minutesElapsed = millisecondsElapsed / (1000 * 60);
		const wordsTyped = $race.diffPos / 5; // Assuming an average word length of 5 characters

		$race.wpm = Math.round(wordsTyped / minutesElapsed);
	}

	async function getText() {
		return loadRandomQuote();
		//return 'Foo';
		//return stuff.content;
	}

	async function loadMoreText() {
		const text = await getText();
		$race.text = text.content
			.replace(/\s+/g, ' ') // Replace consecutive whitespace with a single space
			.replace(/\s/g, ' '); // Convert other whitespace characters to spaces
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Racing Sans One" />
</svelte:head>

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
		<button class="racing" on:click={() => start()}>Start a new Race</button>
	{/if}

	{#if $race.status == 'succeeded'}
		<img src="https://www.w3schools.com/tags/smiley.gif" alt="Smiley face" height="42" width="42" />
	{/if}

	<ProgressBar
		isBotEnabled={false}
		userName={'7frank'}
		progress={($race.diffPos / $race.text.length) * 100}
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
			{#each $race.text.split('') as item, i (i)}
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
