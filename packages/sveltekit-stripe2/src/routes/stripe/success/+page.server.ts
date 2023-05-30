// TODO
import * as dotenv from 'dotenv';
dotenv.config();

import { env } from '$env/dynamic/private';
import Stripe from 'stripe';

export async function load({ url }) {
	const sessionId = url.searchParams.get('sessionId');

	if (!env.STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY undefined');
	if (!sessionId) throw new Error('sessionId undefined');

	const stripe = new Stripe(env['STRIPE_SECRET_KEY'], {
		apiVersion: '2022-11-15'
	});

	const session = await stripe.checkout.sessions.retrieve(sessionId);

	return {
		get: session
	};
}
