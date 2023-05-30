import type { RequestEvent } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const GET = async (event: RequestEvent) => {
	const req = event.request.headers;
	console.log(req);

	return json(req);
};
