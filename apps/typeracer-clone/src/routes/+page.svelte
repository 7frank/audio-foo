<script>
	import Counter from '../facets/TypeRazor/TypeRazor.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="TypeRazor" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>
		<h1>to TypeRazor</h1>
		<a href="/play">Start a Race</a>
	</h1>


	<ul>
		<li>train individual weaknesses by selecting words from a sentence after the race</li>
		<li>re-implement the word by word feature of typeRacer</li>
		<li>
			implement the race track / progress bar and give it a "spin" some eye candy for sections where
			your speed is increasing
		</li>
		<li>try to implement other type racer features later on</li>
	</ul>


</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
