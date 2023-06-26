<script lang="ts">
	import { onMount } from 'svelte';

	let ref: HTMLDivElement;

	function generateStreetSVG() {
		const svgCode = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200">
      <rect x="0" y="100" width="800" height="100" fill="#808080"/> <!-- Road -->
      <rect x="0" y="180" width="800" height="20" fill="#A9A9A9"/> <!-- Sidewalk -->
      <line x1="0" y1="180" x2="800" y2="180" stroke="#FFFFFF" stroke-dasharray="5 5"/> <!-- Sidewalk Separator -->
      <line x1="100" y1="0" x2="100" y2="200" stroke="#FFFFFF" stroke-dasharray="10 10"/> <!-- Building Separator -->
      <rect x="50" y="20" width="150" height="140" fill="#D3D3D3"/> <!-- Building 1 -->
      <rect x="250" y="50" width="200" height="110" fill="#D3D3D3"/> <!-- Building 2 -->
      <rect x="480" y="30" width="120" height="130" fill="#D3D3D3"/> <!-- Building 3 -->
      <rect x="630" y="40" width="100" height="120" fill="#D3D3D3"/> <!-- Building 4 -->
    </svg>
  `;

		return svgCode;
	}
	export let speed: number = 2;

	function setStreetBackground() {
		const streetSVG = generateStreetSVG();

		//ref.style.backgroundImage = `url('data:image/svg+xml,${encodeURIComponent(streetSVG)}')`;
		ref.style.backgroundImage = `url('https://www.shutterstock.com/image-vector/pixel-art-game-background-river-600w-744889291.jpg')`;

		let scrollPosition = 0;

		function scrollStreet() {
			scrollPosition -= speed;
			ref.style.backgroundPosition = `${scrollPosition}px -250px`;
			requestAnimationFrame(scrollStreet);
		}

		scrollStreet();
	}

	onMount(() => {
		setStreetBackground(); // Set initial base speed
	});

	// Example usage to accelerate or decelerate the base speed
	// const increaseSpeedButton = document.querySelector('#increaseSpeedButton');
	// const decreaseSpeedButton = document.querySelector('#decreaseSpeedButton');

	// increaseSpeedButton.addEventListener('click', () => {
	//   setStreetBackground(Math.min(10, speed + 1)); // Increase speed, capped at 10
	// });

	// decreaseSpeedButton.addEventListener('click', () => {
	//   setStreetBackground(Math.max(1, speed - 1)); // Decrease speed, minimum of 1
	// });
</script>

<div bind:this={ref}><slot /></div>

<style>
	div {
		width: 100%;
	}
</style>
