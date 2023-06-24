<script lang="ts">
	import { createRace, type Race } from './store.svelte';
	import { loremIpsum } from './text';
	import { findFirstDifference } from './utils';

	const race = createRace(loremIpsum);

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
		const timeInSeconds = (t.getTime() - $race.startTime.getTime()) / 1000;

		$race.wpm = Math.round($race.diffPos / (timeInSeconds / 5));
	}
</script>

{#if $race.status == 'idle'}
	<h1>Typing Practice</h1>
	<ul>
		<li>train individual weaknesses by selecting words from a sentence after the race</li>
		<li>re-implement the word by word feature of typeRacer</li>
		<li>
			implement the race track / progress bar and give it a "spin" some eye candy for sections where
			your speed is increasing
		</li>
		<li>try to implement other type racer features later on</li>
	</ul>
{/if}

{#if $race.status == 'countdown'}
	<p>Race starts in {$race.countDown}</p>
{/if}

{#if $race.status == 'idle' || $race.status == 'succeeded' || $race.status == 'failed' || $race.status == 'aborted'}
	<button on:click={() => start()}>Start a new Race</button>
{/if}

{#if $race.status == 'succeeded'}
	<img src="https://www.w3schools.com/tags/smiley.gif" alt="Smiley face" height="42" width="42" />
{/if}

{#if $race.status == 'started'}
	<h1>WPM: {$race.wpm}</h1>
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
		width: 60%;
		resize: none;
	}

	.text {
		font-size:2rem;
		width: 80%;
		height: auto;
	}
</style>
