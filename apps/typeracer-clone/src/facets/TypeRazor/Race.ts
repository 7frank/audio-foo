import { reactive } from './reactive';
import { delay, findFirstDifference } from './utils';
import type { IQuoteLoader } from './IQuoteLoader';
import type { RacingStore } from '../RacingHistory/RacingStore';

import type { Writable } from 'svelte/store';
import type { Quote } from './loadRandomQuoteAdapter';

const fps = 60;
const updateInterval = 1000 / fps;

function getWordAt(str: string, pos: number) {
	// Perform type conversions.
	str = String(str);
	pos = Number(pos) >>> 0;

	// Search for the word's beginning and end.
	const left = str.slice(0, pos + 1).search(/\S+$/),
		right = str.slice(pos).search(/\s/);

	// The last word in the string is a special case.
	if (right < 0) {
		return str.slice(left);
	}

	// Return the word, using the located bounds to extract it from the string.
	return str.slice(left, right + pos);
}

@reactive()
export class Race {
	interval?: NodeJS.Timeout;
	countDownTimerId?: NodeJS.Timeout;
	startTime: Date;
	elapsedMs: number;
	endTime: Date;
	isTyping: boolean;
	wpm: number;
	text: Quote;
	userInput: string;
	status: 'idle' | 'countdown' | 'started' | 'paused' | 'succeeded' | 'aborted' | 'failed';
	countDown: number;
	diffPos: number;
	currentCursorPos: number;

	constructor(private quoteLoader: IQuoteLoader, private store: Writable<RacingStore>) {
		this.reset();
	}

	reset() {
		this.startTime = new Date();
		this.elapsedMs = 0;
		this.endTime = new Date();
		this.userInput = '';
		this.isTyping = false;
		this.wpm = 0;
		this.text = { _id: '-1', author: 'Foo', content: 'Bar', tags: [], length: 3 };
		this.status = 'idle';
		this.countDown = 0;
		this.diffPos = 0;
		this.currentCursorPos = 0;
	}

	onCountDownTick() {
		this.countDown -= 1 / fps;

		if (!this.isTyping && this.countDown <= 0) {
			this.isTyping = true;
			this.startTime = new Date();
			this.interval = setInterval(() => this.run(), updateInterval);
			this.userInput = '';

			if (this.status != 'started') this.status = 'started';

			clearInterval(this.countDownTimerId);
		}
	}

	async start() {
		const quote = await this.quoteLoader.loadQuote();
		this.text = quote;

		this.status = 'idle';
		this.diffPos = 0;
		this.wpm = 0;
		await delay(50);

		this.countDown = 3;
		this.status = 'countdown';
		this.countDownTimerId = setInterval(() => this.onCountDownTick(), updateInterval);
	}

	stop(reason: Race['status']) {
		if (this.isTyping) {
			this.isTyping = false;
			this.endTime = new Date();
			//if (this.interval) clearInterval(this.interval);
			this.calculateWPM(this.endTime);
		}

		this.status = reason;

		clearInterval(this.interval);
		clearInterval(this.countDownTimerId);
	}

	run() {
		this.calculateWPM(new Date());
	}

	/**
	 * Trigger this function after userInput changed to update game logic.
	 */
	updateLogic() {
		const {
			diffPos: _d,
			isSame,
			hasError
		} = findFirstDifference(this.text.content, this.userInput);
		this.diffPos = _d;
		this.currentCursorPos = this.userInput.length;

		if (hasError) {
			const w = getWordAt(this.text.content, this.diffPos);

			this.store.update((it) => {
				const lastError = it.spellingErrors.pop();

				if (lastError?.word == w) {
					lastError.severity++;

					it.spellingErrors = [...it.spellingErrors, lastError];
					return it;
				} else {
					const newError = {
						_id: this.text._id,
						severity: 1,
						word: w,
						createdAt: new Date().getTime()
					};
					if (lastError) it.spellingErrors = [...it.spellingErrors, lastError, newError];
					else it.spellingErrors = [...it.spellingErrors, newError];
					return it;
				}
			});
		}

		if (isSame) {
			this.stop('succeeded');

			this.store.update((it) => {
				it.history = [
					...it.history,
					{
						_id: this.text._id,
						author: this.text.author,
						wpm: this.wpm,
						createdAt: new Date().getTime()
					}
				];
				return it;
			});
		}
	}

	calculateWPM(t: Date) {
		const millisecondsElapsed = t.getTime() - this.startTime.getTime();
		this.elapsedMs = millisecondsElapsed;

		const minutesElapsed = millisecondsElapsed / (1000 * 60);
		const wordsTyped = this.diffPos / 5; // Assuming an average word length of 5 characters

		this.wpm = Math.round(wordsTyped / minutesElapsed);
	}

	subscribe() {
		throw new Error('will be implemented by "reactive" decorator');
	}
}
