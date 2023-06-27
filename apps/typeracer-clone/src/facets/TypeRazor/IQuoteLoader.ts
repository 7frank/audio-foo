import { loadRandomQuoteAdapter, type Quote } from './loadRandomQuoteAdapter';

export class IQuoteLoader {
	async loadRandomQuote(): Promise<Quote> {
		const quote = await loadRandomQuoteAdapter();
		quote.content = quote.content
			.replace(/\s+/g, ' ') // Replace consecutive whitespace with a single space
			.replace(/\s/g, ' '); // Convert other whitespace characters to spaces
		return quote;
	}
}
