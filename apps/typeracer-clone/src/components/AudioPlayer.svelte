<script lang="ts">
	// https://www.fesliyanstudios.com/royalty-free-music/downloads-c/8-bit-music/6

	import { onMount } from 'svelte';

	export let src: string | string[] = '';

	let ref: HTMLAudioElement;

	onMount(() => {
		ref.volume = 0.2;

		const len = typeof src == 'string' ? 1 : src.length;

		const randomIndex = Math.floor(Math.random() * len);

		const el = ref.querySelectorAll('source')[randomIndex];
		ref.src = el.src;
		ref.play();
	});
</script>

<audio bind:this={ref} playsinline controls autoplay loop>
	{#each typeof src == 'string' ? [src] : src as s}
		<source src={s} type="audio/mp3" />
	{/each}

	<track kind="captions" default />
</audio>

<style>
	audio {
		display: none;
	}
</style>
