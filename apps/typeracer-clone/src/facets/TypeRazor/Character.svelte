<script lang="ts">
	import * as PIXI from 'pixi.js';
	import atlasData from '$lib/assets/Sunny-land-assets-files/texture.json';
	import atlasTexture from '$lib/assets/Sunny-land-assets-files/texture.png';
	import { onMount } from 'svelte';

	let ref: HTMLDivElement;

	export let height = '50px';
	export let width = '50px';
	export let state: 'idle' | 'run' = 'idle';

	async function loadSpriteSheet() {
		atlasData.animations = {
			idle: Array.from({ length: 4 }, (_, i) => `Sunny-land-assets-files/idle/${i}.png`),
			run: Array.from({ length: 6 }, (_, i) => `Sunny-land-assets-files/run/${i}.png`)
		};

		// Create the SpriteSheet from data and image
		const textureSrc = '/assets/Sunny-land-assets-files/' + atlasData.meta.image;
		console.log(textureSrc, atlasTexture);
		const spriteSheet = new PIXI.Spritesheet(PIXI.BaseTexture.from(atlasTexture), atlasData);

		// Generate all the Textures asynchronously
		await spriteSheet.parse();
		return spriteSheet;
	}

	function createAnimation(spriteSheet: PIXI.Spritesheet, state: string) {
		// spriteSheet is ready to use!
		const anim = new PIXI.AnimatedSprite(spriteSheet.animations[state]);

		// set the animation speed
		anim.animationSpeed = 0.1666;

		// play the animation on a loop
		anim.play();

		return anim;
	}

	let app: PIXI.Application;
	let animations: Record<string, PIXI.AnimatedSprite>;

	async function init() {
		app = new PIXI.Application({
			backgroundColor: '#1099bb',
			backgroundAlpha: 0,
			resizeTo: ref
		});

		document.body.appendChild(app.view);

		const sh = await loadSpriteSheet();

		animations = ['idle', 'run'].reduce(
			(accumulator, curr) => ({ ...accumulator, [curr]: createAnimation(sh, curr) }),
			{} as Record<string, PIXI.AnimatedSprite>
		);
	}

	function setCurrentAnimation(animations: Record<string, PIXI.AnimatedSprite>, state: string) {
		if (!app || !animations) return;
		// add it to the stage to render
		app.stage.addChild(animations[state]);

		ref.appendChild(app.view);
	}

	$: setCurrentAnimation(animations, state);

	onMount(() => {
		init();
	});
</script>

<div bind:this={ref} style="height:{height};width:{width}" />
