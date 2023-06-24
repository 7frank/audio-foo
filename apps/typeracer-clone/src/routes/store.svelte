<script lang="ts" context="module">
	import { writable } from 'svelte/store';

	interface Race {
		interval?: NodeJS.Timeout;
		countDownTimerId?: NodeJS.Timeout;
		startTime: Date;
		endTime: Date;
		isTyping: boolean;
		wpm: number;
		readonly text: string;
		userInput: string;
		succeeded: boolean;
		countDown: number;
		diffPos: number;
		currentCursorPos: number;
	}

	export function createRace(text: string) {
		const store = writable<Race>({
			startTime: new Date(),
			endTime: new Date(),
			userInput: '',
			isTyping: false,
			wpm: 0,
			text: text
				.replace(/\s+/g, ' ') // Replace consecutive whitespace with a single space
				.replace(/\s/g, ' '), // Convert other whitespace characters to spaces
			succeeded: false,

			countDown: 0,
			diffPos: 0,
			currentCursorPos: 0
		});

		return store;
	}
</script>
