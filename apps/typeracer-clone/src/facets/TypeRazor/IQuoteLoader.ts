import { getQuoteById, loadRandomQuoteAdapter, type Quote } from './loadRandomQuoteAdapter';

export interface IQuoteLoader {
	loadQuote(): Promise<Quote>;
}

export function isRandomQuote(quoteId: string) {
	return !quoteId || quoteId == 'random';
}

export class QuoteLoader implements IQuoteLoader {
	constructor(private quoteId: string) {}

	async loadQuote(): Promise<Quote> {
		const quote = isRandomQuote(this.quoteId)
			? await loadRandomQuoteAdapter()
			: await getQuoteById(this.quoteId);
		quote.content = quote.content
			.replace(/\s+/g, ' ') // Replace consecutive whitespace with a single space
			.replace(/\s/g, ' '); // Convert other whitespace characters to spaces
		return quote;
	}
}
