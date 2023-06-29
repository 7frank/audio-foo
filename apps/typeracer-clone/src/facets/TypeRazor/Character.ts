import * as PIXI from 'pixi.js';

export async function loadSpriteSheet(atlasData: PIXI.ISpritesheetData, atlasTexture: string) {
	atlasData.animations = {
		idle: Array.from({ length: 4 }, (_, i) => `Sunny-land-assets-files/idle/${i}.png`),
		run: Array.from({ length: 6 }, (_, i) => `Sunny-land-assets-files/run/${i}.png`)
	};

	// Create the SpriteSheet from data and image
	const spriteSheet = new PIXI.Spritesheet(PIXI.BaseTexture.from(atlasTexture), atlasData);

	// Generate all the Textures asynchronously
	await spriteSheet.parse();
	return spriteSheet;
}

export function createAnimation(spriteSheet: PIXI.Spritesheet, state: string) {
	// spriteSheet is ready to use!
	const anim = new PIXI.AnimatedSprite(spriteSheet.animations[state]);

	// set the animation speed
	anim.animationSpeed = 0.1666;

	// play the animation on a loop
	anim.play();

	return anim;
}
