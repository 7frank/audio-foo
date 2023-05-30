import type { RequestEvent } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';

import stripe from '../_stripe';

// FIXME remote static stuff
const subscriptionProductIds = { basic: 'prod_NzNXW6lsQeBMVf', premium: 'prod_NzNXMjIq68m5SH' };
const tokenProductIds = { basicToken: 'prod_Nz5pmL8zjZrDAP' };

/** @type {import('./$types').RequestHandler} */
export const GET = async (event: RequestEvent) => {
	const email = event.url.searchParams.get('email');

	if (!email) return json({ message: 'email not defined' }, { status: 400 });

	try {
		const subscriptions = await getActiveSubscriptionsUser(email);
		const paymentIntents = await getBoughtProducts(email, tokenProductIds['basicToken'], '');
		getBoughtProducts;

		return json({ subscriptions, paymentIntents });
	} catch (e: any) {
		return json({ message: e.message }, { status: 400 });
	}
};

async function getActiveSubscriptionsUser(email: string) {
	const customer = 'cus_NzOhN7bd0k9xoW'; // FIXME remote static customer
	const subscriptions = await stripe.subscriptions.list({
		limit: 100,
		customer,
		status: 'active'
	});

	const subscribedProducts = subscriptions.data.map((it) => ({
		product: it.plan.product
	}));

	const hasBasic =
		subscribedProducts.filter((it) => it.product == subscriptionProductIds['basic']).length > 0;
	const hasPremium =
		subscribedProducts.filter((it) => it.product == subscriptionProductIds['premium']).length > 0;

	if (subscriptions.has_more)
		console.warn(
			'potentially more subscriptions with the same email, this could result in unexpected behavior'
		);
	return { hasPremium, hasBasic };
}

/**
 *
 * FIXME for now the only feasible way to filter or acquire a bought product is to query for the specific amount (e.g. 100 ) there must be a better way
 */
async function getBoughtProducts(email: string, productId: string, beforeDate: string) {
	const customer = 'cus_NzOhN7bd0k9xoW'; // FIXME remote static customer
	const paymentIntents = await stripe.paymentIntents.search({
		limit: 100,
		query: `status:'succeeded' and customer:'${customer}'`
		//customer
	});

	if (paymentIntents.has_more)
		console.warn(
			'potentially more paymentIntents with the same email, this could result in unexpected behavior'
		);

	const res = paymentIntents.data.map((it) => ({
		amount: it.amount,
		paymentId: it.id,
		created: it.created,
		charge: it.latest_charge
	}));

	return res;
}
