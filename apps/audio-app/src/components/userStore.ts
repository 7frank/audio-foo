import { writable } from 'svelte/store';

import * as z from 'zod';

export const User = z.object({
	id: z.string().optional(),
	nodeId: z.string().optional(),
	displayName: z.string().optional(),
	username: z.string().optional(),
	profileUrl: z.string().optional(),
	email: z.string()
});

export type User = z.infer<typeof User>;

export const userStore = writable<User>();
