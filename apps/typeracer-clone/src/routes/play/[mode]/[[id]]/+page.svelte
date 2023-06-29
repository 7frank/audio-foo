<script>
	import { page } from '$app/stores';

	import AudioPlayer from '../../../../components/AudioPlayer.svelte';
	import Bg from '../../../../components/Bg.svelte';
	import TypeRazor from '../../../../facets/TypeRazor/TypeRazor.svelte';

	const bgAudioSources = [
		'https://www.fesliyanstudios.com/musicfiles/2020-03-22_-_8_Bit_Surf_-_FesliyanStudios.com_-_David_Renda/2020-03-22_-_8_Bit_Surf_-_FesliyanStudios.com_-_David_Renda.mp3',
		'https://www.fesliyanstudios.com/musicfiles/2021-08-30_-_Boss_Time_-_www.FesliyanStudios.com/1min-2021-08-30_-_Boss_Time_-_www.FesliyanStudios.com.mp3',
		'https://www.fesliyanstudios.com/musicfiles/2020-06-18_-_8_Bit_Retro_Funk_-_www.FesliyanStudios.com_David_Renda/2020-06-18_-_8_Bit_Retro_Funk_-_www.FesliyanStudios.com_David_Renda.mp3'
	];

	$: quoteId = $page.params.id;
	$: mode = $page.params.mode;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="TypeRazor" />
</svelte:head>

<Bg />
<AudioPlayer src={bgAudioSources} />
<section>
	<TypeRazor {mode} {quoteId} />
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
