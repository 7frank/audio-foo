<script lang="ts">
	import CountDown from './CountDown.svelte';
	import ProgressBar from './ProgressBar.svelte';
	import { createRace, type Race } from './store.svelte';
	import { loremIpsum, stuff } from './text';
	import { findFirstDifference } from './utils';

	function getText() {
		//return "Foo"
		return stuff.content;
	}

	const race = createRace(getText());

	let ref: HTMLInputElement;

	function focusInput() {
		// focus fix
		setTimeout(() => ref.focus(), 10);
	}

	function onCountDownTick() {
		$race.countDown -= 0.05;

		if (!$race.isTyping && $race.countDown <= 0) {
			$race.isTyping = true;
			$race.startTime = new Date();
			$race.interval = setInterval(() => run(), 50);
			$race.userInput = '';

			focusInput();

			$race.status = 'started';

			clearInterval($race.countDownTimerId);
		}
	}

	function start() {
		$race.countDown = 3;
		$race.status = 'countdown';
		$race.countDownTimerId = setInterval(onCountDownTick, 50);
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
		const minutesElapsed = millisecondsElapsed / (1000 * 60);
		const wordsTyped = $race.diffPos / 5; // Assuming an average word length of 5 characters

		$race.wpm = Math.round(wordsTyped / minutesElapsed);
	}
</script>

{#if $race.status == 'countdown'}
	<div class="box">
		<CountDown>
			<div class="counter">
				Race starts in {(Math.round($race.countDown * 100) / 100).toFixed(2)}
			</div>
		</CountDown>
	</div>
{/if}

{#if $race.status == 'idle' || $race.status == 'succeeded' || $race.status == 'failed' || $race.status == 'aborted'}
	<button on:click={() => start()}>Start a new Race</button>
{/if}

{#if $race.status == 'succeeded'}
	<img src="https://www.w3schools.com/tags/smiley.gif" alt="Smiley face" height="42" width="42" />
{/if}

<ProgressBar
	isBotEnabled={false}
	userName={'7frank'}
	progress={($race.diffPos / $race.text.length) * 100}
	wpm={$race.wpm}
/>

{#if $race.status != 'idle'}
	<ProgressBar isBotEnabled={$race.status == 'started'} />
	<ProgressBar isBotEnabled={$race.status == 'started'} />
	<ProgressBar isBotEnabled={$race.status == 'started'} />
	<ProgressBar isBotEnabled={true} />
{/if}

<p class="text">
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

<style>
	input {
		width: 80%;
		resize: none;
		padding: 0.5em;
		font-size: 2rem;
	}

	.text {
		font-size: 2rem;
		width: 80%;
		height: auto;

		border: 1px solid grey;
		padding: 1em;
		background-color: white;
	}

	.box {
		position: absolute;
		top: 3em;
	}

	.counter {
		font-size: 3em;
	}
</style>
