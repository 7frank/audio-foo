import { writable } from 'svelte/store';
import merge from 'ts-deepmerge';

import { browser } from '$app/environment';
import { defaultStore, RacingStore } from './RacingStore';

const storeKey = 'store';

function loadFromStore(): RacingStore {
	if (browser) {
		const s = window.localStorage.getItem(storeKey);
		let json = s ? JSON.parse(s) : defaultStore;
		json = merge(defaultStore, json);
		try {
			return RacingStore.parse(json);
		} catch (e) {
			alert('your racing store was corrupt :-( and could not be retrieved');
			return defaultStore;
		}
	} else return defaultStore;
}

const fromStore = loadFromStore();

export const racingStore = writable<RacingStore>(fromStore);
export const stubRacingStore = writable<RacingStore>(defaultStore);

racingStore.subscribe(
	(val) => browser && window.localStorage.setItem(storeKey, JSON.stringify(val))
);
