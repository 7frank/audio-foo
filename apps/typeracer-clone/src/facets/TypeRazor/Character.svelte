<script lang="ts">
	import * as PIXI from 'pixi.js';
	import atlasData from '$lib/assets/Sunny-land-assets-files/texture.json';
	import atlasTexture from '$lib/assets/Sunny-land-assets-files/texture.png';
	import { onMount } from 'svelte';

	let ref: HTMLDivElement;

	export let height = '50px';
	export let width = '50px';

	async function loadSpriteSheet(app: PIXI.Application) {
		atlasData.animations = {
			idle: [
				'Sunny-land-assets-files/idle/0.png',
				'Sunny-land-assets-files/idle/1.png',
				'Sunny-land-assets-files/idle/2.png',
				'Sunny-land-assets-files/idle/3.png'
			]
		};

		// Create the SpriteSheet from data and image
		const textureSrc = '/assets/Sunny-land-assets-files/' + atlasData.meta.image;
		console.log(textureSrc, atlasTexture);
		const spritesheet = new PIXI.Spritesheet(PIXI.BaseTexture.from(atlasTexture), atlasData);

		// Generate all the Textures asynchronously
		await spritesheet.parse();

		// spritesheet is ready to use!
		const anim = new PIXI.AnimatedSprite(spritesheet.animations.idle);

		// set the animation speed
		anim.animationSpeed = 0.1666;

		// play the animation on a loop
		anim.play();

		// add it to the stage to render
		app.stage.addChild(anim);
	}

	function init() {
		const app = new PIXI.Application({
			backgroundColor: '#1099bb',
			backgroundAlpha: 0,
			resizeTo: ref
		});

		document.body.appendChild(app.view);

		// create a new Sprite from an image path
		const bunny = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png');

		// center the sprite's anchor point
		bunny.anchor.set(0.5);

		// move the sprite to the center of the screen
		bunny.x = app.screen.width / 2;
		bunny.y = app.screen.height / 2;

		app.stage.addChild(bunny);

		// Listen for animate update
		app.ticker.add((delta) => {
			// just for fun, let's rotate mr rabbit a little
			// delta is 1 if running at 100% performance
			// creates frame-independent transformation
			bunny.rotation += 0.1 * delta;
		});

		loadSpriteSheet(app);

		ref.appendChild(app.view);
	}

	onMount(() => {
		init();
	});
</script>

<div bind:this={ref} style="height:{height};width:{width}" />
