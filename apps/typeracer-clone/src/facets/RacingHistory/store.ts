import { writable } from 'svelte/store';
import { z } from 'zod';

const History = z.object({
	_id: z.string(),
	// The quotation text
	content: z.string(),
	// The full name of the author
	author: z.string(),
	// The length of quote (number of characters)
	length: z.number(),
	// An array of tag names for this quote
	tags: z.array(z.string())
});

const RacingStore = z.object({
	history: z.array(History)
});

export type RacingStore = z.infer<typeof RacingStore>;
export type History = z.infer<typeof History>;

const fromStore = localStorage.getItem('store') || ({ history: [] } satisfies RacingStore);
export const racingStore = writable<RacingStore>(RacingStore.parse(fromStore));

racingStore.subscribe((val) => localStorage.setItem('store', JSON.stringify(val)));
