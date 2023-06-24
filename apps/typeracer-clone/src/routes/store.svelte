<script lang="ts"  context="module">
import { writable } from 'svelte/store';

interface Race {
	interval: NodeJS.Timeout | null;
	startTime: Date;
	endTime: Date;
	isTyping: boolean;
	wpm: number;
	readonly text: string;
	userInput: string;
	succeeded:boolean;
    countDown:number;
}

export function createRace(text: string) {
	const store = writable<Race>({
		interval: null,
		startTime: new Date(),
		endTime: new Date(),
		userInput: '',
		isTyping: false,
		wpm: 0,
		text: text
			.replace(/\s+/g, ' ') // Replace consecutive whitespace with a single space
			.replace(/\s/g, ' '), // Convert other whitespace characters to spaces
		succeeded:false, 

   		countDown:0
	});

	return store;
}


</script>