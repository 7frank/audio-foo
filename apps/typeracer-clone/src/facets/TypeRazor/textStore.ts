import { writable } from 'svelte/store';

import { z } from 'zod';
import { createZodFetcher } from 'zod-fetch';
import { getRandomInt } from './utils';

const Quote = z.object({
	_id: z.string(),
	// The quotation text
	content: z.string(),
	// The full name of the author
	author: z.string(),
	// The length of quote (number of characters)
	length: z.number(),
	// An array of tag names for this quote
	tags: z.array(z.string())
});

const Page = z.object({
	page: z.number(),
	count: z.number(),
	totalCount: z.number(),
	results: z.array(Quote)
});

export type Quote = z.infer<typeof Quote>;

const fetchWithZod = createZodFetcher();

export const textStore = writable<Quote>();

export async function loadRandomQuote(): Promise<Quote> {
	const response = await fetchWithZod(
		Page,
		'https://api.quotable.io/quotes?minLength=50&page=1&limit=150'
	);

	const index = getRandomInt(0, response.count - 1);

	return response.results[index];
}
