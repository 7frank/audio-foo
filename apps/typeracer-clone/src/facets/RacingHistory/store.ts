import { writable } from 'svelte/store';
import { z } from 'zod';

const History = z.object({
	_id: z.string(),
	// The full name of the author
	author: z.string(),
	// the achieved wpm
	wpm: z.number()
});

const RacingStore = z.object({
	history: z.array(History)
});

export type RacingStore = z.infer<typeof RacingStore>;
export type History = z.infer<typeof History>;

const fromStore = localStorage.getItem('store') || ({ history: [] } satisfies RacingStore);
export const racingStore = writable<RacingStore>(RacingStore.parse(fromStore));

racingStore.subscribe((val) => localStorage.setItem('store', JSON.stringify(val)));
