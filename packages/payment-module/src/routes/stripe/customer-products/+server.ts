import type { RequestEvent } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';

import stripe from '../_stripe';

/** @type {import('./$types').RequestHandler} */
export const GET = async (event: RequestEvent) => {
	const email = event.url.searchParams.get('email');

	if (!email) return json({ message: 'email not defined' }, { status: 400 });

	try {
		const res = await getProductsAndSubscriptionsUserPaidFor(email);

		return json(res);
	} catch (e: any) {
		return json({ message: e.message }, { status: 400 });
	}
};

async function getProductsAndSubscriptionsUserPaidFor(email: string) {
	const customer = 'cus_NzOhN7bd0k9xoW'; // FIXME remote static customer
	const paymentIntents = await stripe.subscriptions.search({
		query: `status:'active'`
	});

	const res = paymentIntents.data.map((it) => ({ product: it }));

	if (paymentIntents.has_more)
		console.warn(
			'potentially more paymentIntents with the same email, this could result in unexpected behavior'
		);
	return res[0] ?? [];
}
