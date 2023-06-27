import { reactive } from './reactive';

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

	constructor() {
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

	subscribe() {
		throw new Error('will be implemented by "reactive" decorator');
	}
}
