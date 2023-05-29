import { writable } from 'svelte/store';

import * as z from 'zod';

export const User = z.object({
	id: z.string(),
	nodeId: z.string(),
	displayName: z.string().nullable(),
	username: z.string().nullable(),
	profileUrl: z.string().nullable()
});

export type User = z.infer<typeof User>;

export const userStore = writable<User>();
