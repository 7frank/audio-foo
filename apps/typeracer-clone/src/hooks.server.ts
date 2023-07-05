import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import {
	PROVIDERS_GOOGLE_CLIENT_ID,
	PROVIDERS_GOOGLE_CLIENT_SECRET,
	SECRETSECRET
} from '$env/static/private';

export const handle = SvelteKitAuth({
	providers: [
		//@ts-expect-error issue https://github.com/nextauthjs/next-auth/issues/6174
		Google({
			clientId: PROVIDERS_GOOGLE_CLIENT_ID,
			clientSecret: PROVIDERS_GOOGLE_CLIENT_SECRET,
			authorization: { params: { prompt: 'consent' } }
		})
	],
	secret: SECRETSECRET,
	session: {
		strategy: 'jwt'
	}
});
