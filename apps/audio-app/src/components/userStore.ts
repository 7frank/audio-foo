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

export const UserStore = z.discriminatedUnion('status', [
	z.object({ status: z.literal('loggedIn'), user: User }),
	z.object({ status: z.literal('notLoggedIn') }),
	z.object({ status: z.literal('failed'), error: z.string() })
]);

export type UserStore = z.infer<typeof UserStore>;

export const userStore = writable<UserStore>({ status: 'notLoggedIn' });

async function fetchUser() {
	const response = await fetch('http://localhost/api/auth/github/me');
	if (!response.ok) {
		throw new Error(response.status + response.statusText);
	}
	const json = await response.json();

	const user = User.parse(json);

	userStore.set({ status: 'loggedIn', user });
}

fetchUser().catch((e) => userStore.set({ status: 'failed', error: e.message }));
