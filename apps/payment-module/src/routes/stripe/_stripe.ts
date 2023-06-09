import Stripe from 'stripe';
import * as dotenv from 'dotenv';

import { env } from '$env/dynamic/private';

dotenv.config();

const stripe = new Stripe(env['STRIPE_SECRET_KEY']!, {
	apiVersion: '2022-11-15'
});

export default stripe;
