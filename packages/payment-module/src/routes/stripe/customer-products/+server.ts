import type { RequestEvent } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';

import stripe from '../_stripe';

/** @type {import('./$types').RequestHandler} */
export const GET = async (event: RequestEvent) => {
	const email = event.url.searchParams.get('email');

	if (!email) return json({ message: 'email not defined' }, { status: 400 });

	try {
		const res = await getActiveSubscriptionsUser(email);

		return json({ subscriptions: res });
	} catch (e: any) {
		return json({ message: e.message }, { status: 400 });
	}
};

async function getActiveSubscriptionsUser(email: string) {
	const customer = 'cus_NzOhN7bd0k9xoW'; // FIXME remote static customer
	const paymentIntents = await stripe.subscriptions.list({
		limit: 100,
		customer,
		status: 'active'
	});

	// FIXME remote static stuff
	const subscriptionProductIds = { basic: 'prod_NzNXW6lsQeBMVf', premium: 'prod_NzNXMjIq68m5SH' };
	const tokenProductIds = ['prod_Nz5pmL8zjZrDAP'];

	const subscribedProducts = paymentIntents.data.map((it) => ({
		product: it.plan.product
	}));

	const hasBasic =
		subscribedProducts.filter((it) => it.product == subscriptionProductIds['basic']).length > 0;
	const hasPremium =
		subscribedProducts.filter((it) => it.product == subscriptionProductIds['premium']).length > 0;

	if (paymentIntents.has_more)
		console.warn(
			'potentially more paymentIntents with the same email, this could result in unexpected behavior'
		);
	return { hasPremium, hasBasic };
}
