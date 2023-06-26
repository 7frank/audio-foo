<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Street from '../../components/Street.svelte';

	function getRandomInt(min: number, max: number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	export let progress = 0;

	export let isBotEnabled = false;
	export let isStreetAnimated = false;

	export let userName = 'Bot' + getRandomInt(2, 8);
	export let wpm = getRandomInt(30, 70);

	let interval: NodeJS.Timeout;

	onMount(() => {
		interval = setInterval(() => {
			if (!isBotEnabled) return;

			progress += 1;
			if (progress >= 100) clearInterval(interval);
		}, 10 * wpm);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<main>
	<div class="progress-bar">
		<Street speed={isStreetAnimated ? wpm / 5 : 0}>
			<div class="progress" style="width: {progress}%;">
				<span>{userName}</span>
				<img alt="razor" src="https://i.giphy.com/media/vNqgL8Rv3Qta5rFB9s/giphy.webp" />
			</div>
		</Street>
	</div>
	<span class="wpm">{wpm} wpm</span>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: row;
		width: calc(100% - 2em);
		margin-right: 2em;
		background: rgba(255, 255, 255, 1);
		padding: 0.5em 0.5em;
	}

	.progress-bar {
		display: flex;
		flex-direction: row;
		overflow: visible;
		width: calc(100% - 10em);
		margin-left: 10em;
		height: 3em;
		background-color: #f2f2f2;
		border-radius: 10px;

		margin-bottom: 0.5em;
	}

	.wpm {
		padding: 0.5em;
		margin-left: auto;
		white-space: nowrap;
		width: 3em;
	}
	.progress {
		overflow: visible;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		height: 100%;
		border-bottom: 3px solid #47b2ff;
		transition: width 0.3s ease-in-out;

		& > span {
			font-weight: bold;
			margin: 0.5em;
		}

		& > img {
			border: 1px solid grey;
			margin: 0.5em;
			transform: scale(1.5) rotate(90deg);
		}
	}
</style>
