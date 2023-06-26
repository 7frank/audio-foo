<script>
	import Bg from '../../components/Bg.svelte';
	import TypeRazor from '../../facets/TypeRazor/TypeRazor.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="TypeRazor" />
</svelte:head>

<Bg/>

<section>
	<TypeRazor />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
