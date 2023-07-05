import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	/**
	 * The "play" route allows for extra features if logged in.
	 */

	const session = await event.locals.getSession();
	if (!session?.user) return {};
	return {
		YAY: 'You are awesome!!! Thanks for supporting us!'
	};
};
