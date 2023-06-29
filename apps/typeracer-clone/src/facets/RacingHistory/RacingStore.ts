import { z } from 'zod';

const History = z.object({
	_id: z.string(),
	// The full name of the author
	author: z.string(),
	// the achieved wpm
	wpm: z.number(),
	// Returns the stored time value in milliseconds since midnight, January 1, 1970 UTC.
	createdAt: z.number().optional()
});
export const RacingStore = z.object({
	history: z.array(History),
	version: z.string()
});

export type RacingStore = z.infer<typeof RacingStore>;
export type History = z.infer<typeof History>;
export const defaultStore = { history: [], version: '1.0.0' } satisfies RacingStore;
