<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	function getRandomInt(min: number, max: number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	export let progress = 0;

	export let isBot = true;

	export let userName = 'Bot' + getRandomInt(2, 8);
	export let wpm = getRandomInt(40, 60);

	let interval: NodeJS.Timeout;

	onMount(() => {
		if (isBot)
			interval = setInterval(() => {
				progress += 1;
				if (progress >= 100) clearInterval(interval);
			}, 10 * wpm);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="progress-bar">
	<div class="progress" style="position:relative ; width: {progress}%;">
		<span style="position:absolute;left:0;">{userName}</span>
		<img
			style="position:absolute;right:0;"
			alt="razor"
			src="https://i.giphy.com/media/vNqgL8Rv3Qta5rFB9s/giphy.webp"
			height="24px"
		/>
	</div>
</div>

<style>
	.progress-bar {
		width: 100%;
		height: 3em;
		background-color: #f2f2f2;
		border-radius: 10px;
		overflow: hidden;
		margin-bottom: 0.5em;
	}

	.progress {
		height: 100%;
		background-color: #47b2ff;
		transition: width 0.3s ease-in-out;
	}
</style>
