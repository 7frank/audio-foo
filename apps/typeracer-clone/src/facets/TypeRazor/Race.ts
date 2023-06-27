import { reactive } from './reactive';
import { delay, findFirstDifference } from './utils';
import type { IQuoteLoader } from './IQuoteLoader';

const fps = 60;
const updateInterval = 1000 / fps;

@reactive()
export class Race {
	interval?: NodeJS.Timeout;
	countDownTimerId?: NodeJS.Timeout;
	startTime: Date;
	elapsedMs: number;
	endTime: Date;
	isTyping: boolean;
	wpm: number;
	text: string;
	userInput: string;
	status: 'idle' | 'countdown' | 'started' | 'paused' | 'succeeded' | 'aborted' | 'failed';
	countDown: number;
	diffPos: number;
	currentCursorPos: number;

	constructor(private quoteLoader: IQuoteLoader) {
		this.reset();
	}

	reset() {
		this.startTime = new Date();
		this.elapsedMs = 0;
		this.endTime = new Date();
		this.userInput = '';
		this.isTyping = false;
		this.wpm = 0;
		this.text = '';
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

			//focusInput();

			this.status = 'started';

			clearInterval(this.countDownTimerId);
		}
	}

	async start() {
		const quote = await this.quoteLoader.loadRandomQuote();
		this.text = quote.content;

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
			if (this.interval) clearInterval(this.interval);
			this.calculateWPM(this.endTime);
		}

		this.status = reason;
	}

	run() {
		// Perform any additional logic during the typing practice interval
		// For example, you can track user input and update the displayed text.

		this.calculateWPM(new Date());
		const { diffPos: _d, isSame } = findFirstDifference(this.text, this.userInput);
		this.diffPos = _d;
		this.currentCursorPos = this.userInput.length;

		if (isSame) {
			this.stop('succeeded');
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
