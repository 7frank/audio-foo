<script lang="ts">
	import * as PIXI from 'pixi.js';
	import atlasData from '$lib/assets/Sunny-land-assets-files/texture.json';
	import atlasTexture from '$lib/assets/Sunny-land-assets-files/texture.png';
	import { onMount } from 'svelte';
	import { createAnimation, loadSpriteSheet } from './Character';

	export let height = '50px';
	export let width = '50px';
	export let state: 'idle' | 'run' = 'idle';

	let ref: HTMLDivElement;
	let app: PIXI.Application;
	let animations: Record<string, PIXI.AnimatedSprite>;

	function setCurrentAnimation(animations: Record<string, PIXI.AnimatedSprite>, state: string) {
		if (!app || !animations) return;

		app.stage.addChild(animations[state]);
		ref.appendChild(app.view);
	}

	$: setCurrentAnimation(animations, state);

	onMount(async () => {
		app = new PIXI.Application({
			backgroundColor: '#1099bb',
			backgroundAlpha: 0,
			resizeTo: ref
		});

		document.body.appendChild(app.view);

		const sh = await loadSpriteSheet(atlasData, atlasTexture);

		animations = ['idle', 'run'].reduce(
			(accumulator, curr) => ({ ...accumulator, [curr]: createAnimation(sh, curr) }),
			{} as Record<string, PIXI.AnimatedSprite>
		);
	});
</script>

<div bind:this={ref} style="height:{height};width:{width}" />
