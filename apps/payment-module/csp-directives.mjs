const rootDomain = process.env.VITE_DOMAIN ?? 'http://localhost:80'; // or your server IP for dev

console.log('rootDomain', rootDomain);

const cspDirectives = {
	'base-uri': ["'self'"],

	'child-src': ["'self'"],

	'connect-src': [
		"'self'",
		'ws://localhost:*',
		'https://api.stripe.com',
		'https://maps.googleapis.com'
	],

	'img-src': ["'self'", 'data:'],

	'font-src': ["'self'", 'data:'],

	'form-action': ["'self'"],

	'frame-ancestors': ["'self'"],

	'frame-src': ["'self'", 'https://*.stripe.com'],

	'manifest-src': ["'self'"],

	'media-src': ["'self'", 'data:'],

	'object-src': ["'none'"],

	'style-src': ["'self'", "'unsafe-inline'"],

	// 'style-src': ["'self'", "'unsafe-inline'", 'https://hcaptcha.com', 'https://*.hcaptcha.com'],

	'default-src': [
		'self',
		...(rootDomain
			? [
					rootDomain
					//	`ws://${rootDomain}`
			  ]
			: [])
	],

	'script-src': ['self', 'https://js.stripe.com', 'https://maps.googleapis.com'],

	'worker-src': ["'self'"]

	// remove report-to & report-uri if you do not want to use Sentry reporting

	// 'report-to': ["'csp-endpoint'"],

	// 'report-uri': [
	// 	`https://sentry.io/api/${process.env.VITE_SENTRY_PROJECT_ID}/security/?sentry_key=${process.env.VITE_SENTRY_KEY}`
	// ]
};

export default cspDirectives;
