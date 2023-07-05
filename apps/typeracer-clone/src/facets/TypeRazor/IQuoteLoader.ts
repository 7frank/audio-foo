import { racingStore } from '../RacingHistory/store';
import { getQuoteById, loadRandomQuoteAdapter, type Quote } from './loadRandomQuoteAdapter';

export interface IQuoteLoader {
	loadQuote(): Promise<Quote>;
}

export class RandomQuoteLoader implements IQuoteLoader {
	async loadQuote(): Promise<Quote> {
		const quote = await loadRandomQuoteAdapter();
		quote.content = quote.content
			.replace(/\s+/g, ' ') // Replace consecutive whitespace with a single space
			.replace(/\s/g, ' '); // Convert other whitespace characters to spaces
		return quote;
	}
}

export class FromIdRandomQuoteLoader implements IQuoteLoader {
	constructor(private quoteId: string) {}

	async loadQuote(): Promise<Quote> {
		// sole exception, put in separate loader
		if (this.quoteId == '-1') {
			const t =
				'Mein Freund Christian Masal wurde in die österreichische Eishockeynationalmannschaft berufen. Heute findet eine rhythmische Jugendmesse statt. Wir schreiben nach dem Zehnfinger-System. In einem Vorort von München findet auch heuer wieder ein Sommersprachkurs statt. Manuel nahm auf sein Haus eine Hypothek auf.';
			return {
				_id: '-1',
				tags: [],
				author: 'https://de4.typewriter.at/index.php?r=typewriter/startPractise&id=259',
				content: t,
				length: t.length
			};
		}

		const quote = await getQuoteById(this.quoteId);
		quote.content = quote.content
			.replace(/\s+/g, ' ') // Replace consecutive whitespace with a single space
			.replace(/\s/g, ' '); // Convert other whitespace characters to spaces
		return quote;
	}
}

export class TrainWeakWordsQuoteLoader implements IQuoteLoader {
	async loadQuote(): Promise<Quote> {
		const quote = await new Promise<Quote>((resolve) => {
			racingStore.update((it) => {
				const sentence = it.spellingErrors
					.filter((it) => it.selectedForTraining)
					.map((it) => Array.from({ length: 4 }, () => it.word).join(' '))
					.join(' ');
				const quote = { _id: '', author: '', content: sentence, length: sentence.length, tags: [] };
				resolve(quote);
				return it;
			});
		});

		return quote;
	}
}
