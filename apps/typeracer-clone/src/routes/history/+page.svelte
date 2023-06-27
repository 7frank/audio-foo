<script>
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import bgImage from '$lib/images/desert.jpeg';
	import AudioPlayer from '../../components/AudioPlayer.svelte';
	import Bg from '../../components/Bg.svelte';
	import RacingHistory from '../../facets/RacingHistory/RacingHistory.svelte';
	
	const bgAudioSources = [
		'https://www.fesliyanstudios.com/musicfiles/2020-03-22_-_8_Bit_Surf_-_FesliyanStudios.com_-_David_Renda/2020-03-22_-_8_Bit_Surf_-_FesliyanStudios.com_-_David_Renda.mp3',
		'https://www.fesliyanstudios.com/musicfiles/2021-08-30_-_Boss_Time_-_www.FesliyanStudios.com/1min-2021-08-30_-_Boss_Time_-_www.FesliyanStudios.com.mp3'
	];
</script>

<svelte:head>
	<title>History</title>
	<meta name="description" content="TypeRazor" />
</svelte:head>

<Bg src={bgImage} />
<AudioPlayer src={bgAudioSources} />
<section>
<RacingHistory></RacingHistory>
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
