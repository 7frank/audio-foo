<script lang="ts">
	import { onMount } from 'svelte';
	import imageUrl from '$lib/images/tunnel_road.jpg';
	let ref: HTMLDivElement;

	export let speed: number = 2;

	//let imageUrl="https://opengameart.org/sites/default/files/tunnel_road.jpg"
	//let imageUrl="https://www.shutterstock.com/image-vector/pixel-art-game-background-river-600w-744889291.jpg"

	function setStreetBackground() {
		//ref.style.backgroundImage = `url('data:image/svg+xml,${encodeURIComponent(streetSVG)}')`;
		ref.style.backgroundImage = `url(${imageUrl})`;

		let scrollPosition = 0;

		function scrollStreet() {
			scrollPosition -= speed;
			ref.style.backgroundPosition = `${scrollPosition}px 0px`;
			requestAnimationFrame(scrollStreet);
		}

		scrollStreet();
	}

	onMount(() => {
		setStreetBackground(); // Set initial base speed
	});
</script>

<div class="container" bind:this={ref}>
	<slot />
</div>

<style>
	.container {
		width: 100%;
		height: 60px;
		background-size: 120px 115px;
	}
</style>
