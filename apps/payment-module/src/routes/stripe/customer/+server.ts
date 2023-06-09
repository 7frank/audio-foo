import type { RequestEvent } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';

import stripe from '../_stripe';

/** @type {import('./$types').RequestHandler} */
export const GET = async (event: RequestEvent) => {
	const email = event.url.searchParams.get('email');

	if (!email) return json({ message: 'email not defined' }, { status: 400 });

	try {
		const res = await getCustomerIdFromEmail(email);

		return json(res);
	} catch (err) {
		return error(500, err as Error);
	}
};

async function getCustomerIdFromEmail(email: string) {
	const customers = await stripe.customers.list({
		//limit: 3,
		email
	});

	const res = customers.data.map((it) => ({ email: it.email, customerId: it.id, name: it.name }));

	if (customers.has_more)
		console.warn(
			'potentially more customers with the same email, this could result in unexpected behavior'
		);
	return res[0] ?? [];
}
