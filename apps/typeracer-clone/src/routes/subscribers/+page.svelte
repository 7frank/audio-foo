<script>
	import { page } from '$app/stores';
	import AudioPlayer from '../../components/AudioPlayer.svelte';
	import Bg from '../../components/Bg.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';


	 /** @type {import('./$types').PageData} */
	 export let data;
   


	const bgAudioSources = [
		'https://www.fesliyanstudios.com/musicfiles/2020-03-22_-_8_Bit_Surf_-_FesliyanStudios.com_-_David_Renda/2020-03-22_-_8_Bit_Surf_-_FesliyanStudios.com_-_David_Renda.mp3',
		'https://www.fesliyanstudios.com/musicfiles/2021-08-30_-_Boss_Time_-_www.FesliyanStudios.com/1min-2021-08-30_-_Boss_Time_-_www.FesliyanStudios.com.mp3',
		'https://www.fesliyanstudios.com/musicfiles/2020-06-18_-_8_Bit_Retro_Funk_-_www.FesliyanStudios.com_David_Renda/2020-06-18_-_8_Bit_Retro_Funk_-_www.FesliyanStudios.com_David_Renda.mp3'
	];

	$: quoteId = $page.params.id;
	$: mode = $page.params.mode;
</script>

<svelte:head>
	<title>Subscribers</title>
	<meta name="description" content="TypeRazor" />
</svelte:head>

<Bg />
<AudioPlayer src={bgAudioSources} />
<section>
	<div id="shadowBox">
		<h1 class="rainbow rainbow_text_animated">Hey {data.session?.user?.name} ({data.session?.user?.email}), <img src="{data.session?.user?.image}" /> </h1>
		<h3 class="rainbow rainbow_text_animated">{data.description}</h3>
		<Avatar
		border="border-4 border-surface-300-600-token hover:!border-primary-500"
		cursor="cursor-pointer"
	/>
	</div>
	
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	#shadowBox {
    background-color: rgb(0, 0, 0);
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0.2);
    /* Black w/opacity/see-through */
    border: 3px solid;
	margin:1em;
	padding:1em;
}

.rainbow {
    text-align: center;
    text-decoration: underline;
    font-size: 32px;
    font-family: monospace;
    letter-spacing: 5px;
}
.rainbow_text_animated {
    background: linear-gradient(to right, #6666ff, #0099ff , #00ff00, #ff3399, #6666ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: rainbow_animation 6s ease-in-out infinite;
    background-size: 400% 100%;
}

@keyframes rainbow_animation {
    0%,100% {
        background-position: 0 0;
    }

    50% {
        background-position: 100% 0;
    }
}


</style>
