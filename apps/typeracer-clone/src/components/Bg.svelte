<script>
	import defaultImage from '$lib/images/caverns.jpg';
	import { onMount } from 'svelte';

	export let src = defaultImage;

	onMount(() => {
		document.querySelector('body')?.setAttribute('style', `background-image:url(${src})`);
	});
</script>

<style>
	:global(body) {
		background-size: cover;
	}
</style>
