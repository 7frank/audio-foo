<script lang="ts" context="module">
	import { writable } from 'svelte/store';

	export interface Race {
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
	}

	export function createRace() {
		const store = writable<Race>({
			startTime: new Date(),
			elapsedMs: 0,
			endTime: new Date(),
			userInput: '',
			isTyping: false,
			wpm: 0,
			text: '-empty-',
			status: 'idle',

			countDown: 0,
			diffPos: 0,
			currentCursorPos: 0
		});

		return store;
	}
</script>
