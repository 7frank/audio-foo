import type { RequestEvent } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';

import stripe from '../_stripe';
import { Stripe } from 'stripe';

import { z } from 'zod';

type Mode = 'payment' | 'setup' | 'subscription';
export type PIMetaData = {
	paymentMode: 'payment' | 'setup' | 'subscription';
	productId: string;
};

function createPaymentIntentMetaData(mode: Mode, productId: string): PIMetaData {
	return { paymentMode: mode, productId };
}

const CheckoutSession = z.object({
	priceId: z.string(),
	mode: z.union([z.string('payment'), z.string('setup'), z.string('subscription')]),
	customerId: z.string().optional(), // FIXME if we allow the client to set the customerId we have to validate that the email of the sso user is the email of the customer
	productId: z.string() // will be used to connect paymentIntent with the bought product
});

export type CheckoutSession = z.infer<typeof CheckoutSession>;

/** @type {import('./$types').RequestHandler} */
export const POST = async (event: RequestEvent) => {
	const req = event.request;
	// console.log(event.url, event.request.headers);
	const formData = CheckoutSession.parse(await req.json());

	const priceId = formData.priceId;

	// TODO call stripe and find customerId from email (if it does not exist use email to create customer)

	const customerId = formData.customerId ?? 'cus_NzOhN7bd0k9xoW'; // FIXME remote static customer

	const customer_email = event.request.headers.get('x-forwarded-user');

	const mode = formData.mode as Mode;
	const productId = formData.productId;
	if (!customer_email && !customerId)
		return json({ message: 'neither email nor customerId defined' }, { status: 400 });

	const checkoutSessionOptions: Stripe.Checkout.SessionCreateParams = {
		mode: mode,
		payment_method_types: ['card'],
		line_items: [
			{
				price: priceId,
				quantity: 1
			}
		],
		success_url: `http://${event.url.host}/payment-module/stripe/success?sessionId={CHECKOUT_SESSION_ID}`,
		cancel_url: `http://${event.url.host}/payment-module`,
		payment_intent_data:
			mode == 'payment' // cannot add pi meta data to subscriptions
				? {
						metadata: createPaymentIntentMetaData(mode, productId) // TODO attach more meaningful meta data to later distinguish paymentIntents
				  }
				: undefined
	};

	if (customerId) checkoutSessionOptions.customer = customerId;
	else if (customer_email) checkoutSessionOptions.customer_email = customer_email;

	try {
		const session = await stripe.checkout.sessions.create(checkoutSessionOptions);
		return json({
			sessionId: session.id
		});
	} catch (err) {
		return json({ error: (err as Error).message }, { status: 500 });
	}
};
