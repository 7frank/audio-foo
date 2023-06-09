import stripe from '../_stripe';

export async function load({ url }) {
	const sessionId = url.searchParams.get('sessionId');

	if (!sessionId) throw new Error('sessionId undefined');

	const session = await stripe.checkout.sessions.retrieve(sessionId);

	return {
		get: session
	};
}
