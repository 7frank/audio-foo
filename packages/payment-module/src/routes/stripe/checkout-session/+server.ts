import type { RequestEvent } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';
import stripe from '../_stripe';
import { z } from 'zod';

const CheckoutSession = z.object({
	priceId: z.string(),
	mode: z.union([z.string('payment'), z.string('setup'), z.string('subscription')]),
	customerId: z.string().optional() // FIXME if we allow the client to set the customerId we have to validate that the email of the sso user is the email of the customer
});

export type CheckoutSession = z.infer<typeof CheckoutSession>;

/** @type {import('./$types').RequestHandler} */
export const POST = async (event: RequestEvent) => {
	const req = event.request;

	const formData = CheckoutSession.parse(await req.json());

	const priceId = formData.priceId;
	const customerId = formData.customerId ?? 'cus_NzOhN7bd0k9xoW'; // FIXME remote static customer
	const mode = formData.mode;

	try {
		const session = await stripe.checkout.sessions.create({
			customer: customerId,
			mode: mode,
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
		return json({ error: (err as Error).message }, { status: 500 });
	}
};
