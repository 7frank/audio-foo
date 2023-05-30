import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';
import stripe from '../_stripe';

export const POST: RequestHandler = async (event: RequestEvent) => {
	const req = event.request;

	const formData = await req.json();
	const priceId = formData.priceId;

	if (typeof priceId !== 'string') {
		return error(400, new Error('priceId is required'));
	}

	try {
		const session = await stripe.checkout.sessions.create({
			mode: 'subscription',
			payment_method_types: ['card'],
			line_items: [
				{
					price: priceId,
					quantity: 1
				}
			],
			success_url: `http://${event.url.host}/stripe/success?sessionId={CHECKOUT_SESSION_ID}`,
			cancel_url: `http://${event.url.host}/`
		});
		return json({
			sessionId: session.id
		});
	} catch (err) {
		return error(500, err as Error);
	}
};
