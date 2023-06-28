<script lang="ts">
	import * as PIXI from 'pixi.js';

	import { onMount } from 'svelte';

	let ref: HTMLDivElement;

    export let height="50px"
    export let width="50px"

	function init() {
		const app = new PIXI.Application({
            
			backgroundColor: '#1099bb',
            backgroundAlpha:0,
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
		ref.appendChild(app.view);
	}

	onMount(() => {
		init();
	});
</script>

<div bind:this={ref} style="height:{height};width:{width}" />
