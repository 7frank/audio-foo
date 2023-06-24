<script lang="ts">
	import { createRace } from './store.svelte';

	const race = createRace('Type the text here');

	let ref: HTMLInputElement;

	function onCountDownTick() {
		$race.countDown -= 0.05;

		if (!$race.isTyping && $race.countDown <= 0) {
			$race.isTyping = true;
			$race.startTime = new Date();
			$race.interval = setInterval(() => run(), 50);
			$race.userInput = '';

			// focus fix
			setTimeout(() => ref.focus(), 10);

			$race.succeeded = false;

			clearInterval($race.countDownTimerId);
		}
	}

	function start() {
		$race.countDown = 3;
		$race.countDownTimerId = setInterval(onCountDownTick, 50);
	}

	function stop() {
		if ($race.isTyping) {
			$race.isTyping = false;
			$race.endTime = new Date();
			clearInterval($race.interval!);
			calculateWPM($race.endTime);
			$race.succeeded = true;
		}
	}

	function run() {
		// Perform any additional logic during the typing practice interval
		// For example, you can track user input and update the displayed text.

		calculateWPM(new Date());
		const { diffPos: _d, isSame } = findFirstDifference($race.text, $race.userInput);
		$race.diffPos = _d;
		$race.currentCursorPos = $race.userInput.length;

		if (isSame) {
			stop();
		}
	}

	function calculateWPM(t: Date) {
		const timeInSeconds = (t.getTime() - $race.startTime.getTime()) / 1000;

		$race.wpm = Math.round($race.diffPos / (timeInSeconds / 5));
	}

	function findFirstDifference(text1: string, text2: string) {
		const length = Math.min(text1.length, text2.length);

		for (let i = 0; i < length; i++) {
			if (text1[i] !== text2[i]) {
				return { diffPos: i, isSame: false };
			}
		}

		// If the loop completes without finding a difference,
		// check if the lengths of the texts are different
		if (text1.length !== text2.length) {
			return { diffPos: length, isSame: false };
		}

		// If the lengths and all characters are the same, return -1
		return { diffPos: length, isSame: true };
	}
</script>

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

{#if $race.countDown > 0}
	<p>Race starts in {$race.countDown}</p>
{:else}
	<button on:click={() => start()}>Start Race</button>
{/if}

{#if $race.succeeded}
	<img src="https://www.w3schools.com/tags/smiley.gif" alt="Smiley face" height="42" width="42" />
{/if}

<h1>WPM: {$race.wpm}</h1>

<p>
	{#each $race.text.split('') as item, i (i)}
		<span
			style="background-color: {i < $race.diffPos
				? 'lightgreen'
				: i < $race.currentCursorPos && $race.diffPos < $race.currentCursorPos
				? 'red'
				: 'white'};">{item}</span
		>
	{/each}
</p>
<input bind:this={ref} bind:value={$race.userInput} disabled={!$race.isTyping} />

<style>
	input {
		width: 60%;
		resize: none;
	}
</style>
