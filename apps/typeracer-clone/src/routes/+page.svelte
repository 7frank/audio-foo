<script>
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import bgImage from '$lib/images/desert.jpeg';
	import Bg from '../components/Bg.svelte';
	import AudioPlayer from '../components/AudioPlayer.svelte';

	const bgAudioSources = [
		'https://www.fesliyanstudios.com/musicfiles/2020-03-22_-_8_Bit_Surf_-_FesliyanStudios.com_-_David_Renda/2020-03-22_-_8_Bit_Surf_-_FesliyanStudios.com_-_David_Renda.mp3',
		'https://www.fesliyanstudios.com/musicfiles/2021-08-30_-_Boss_Time_-_www.FesliyanStudios.com/1min-2021-08-30_-_Boss_Time_-_www.FesliyanStudios.com.mp3'
	];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="TypeRazor" />
</svelte:head>

<Bg src={bgImage} />
<AudioPlayer src={bgAudioSources} />
<section>
	
		<div class="welcome" style="height:250px">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</div>
		<h1 class="h1 racing">- to TypeRazor - </h1>
		<a class="h1 mt-20 mb-10 racing" href="/play/random">Start a Race</a>
	
		<div class="card p-4 opacity-80">
	<ul>
		<li>train individual weaknesses by selecting words from a sentence after the race</li>
		<li>re-implement the word by word feature of typeRacer</li>
		<li>
			implement the race track / progress bar and give it a "spin" some eye candy for sections where
			your speed is increasing
		</li>
		<li>try to implement other type racer features later on</li>
		<li>https://www.gutenberg.org/ebooks/7849</li>
		<li>https://gutendex.com/</li>
	</ul>
</div>
</section>

<style>
	section {
		user-select: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	.welcome {
		pointer-events: none;
		display: block;
		position: relative;
		width: 100%;
		
		padding: 0 0 0 0;
	}

	.welcome img {
		position: relative;
		width: 100%;
		
		
		display: block;
	}
	.racing {
		
		font-family: 'Racing Sans One', sans-serif;
	}

</style>
