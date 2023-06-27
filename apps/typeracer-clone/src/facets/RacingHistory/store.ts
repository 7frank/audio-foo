import { writable } from 'svelte/store';
import { z } from 'zod';

import { browser } from '$app/environment';

const History = z.object({
	_id: z.string(),
	// The full name of the author
	author: z.string(),
	// the achieved wpm
	wpm: z.number(),
	// Returns the stored time value in milliseconds since midnight, January 1, 1970 UTC.
	createdAt: z.number().optional()
});

const RacingStore = z.object({
	history: z.array(History)
});

export type RacingStore = z.infer<typeof RacingStore>;
export type History = z.infer<typeof History>;

const fromStore =
	(browser && JSON.parse(window.localStorage.getItem('store') ?? '')) ||
	({ history: [] } satisfies RacingStore);
console.log(fromStore);
export const racingStore = writable<RacingStore>(RacingStore.parse(fromStore));

racingStore.subscribe(
	(val) => browser && window.localStorage.setItem('store', JSON.stringify(val))
);
