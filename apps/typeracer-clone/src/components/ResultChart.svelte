<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';

	interface Keystroke {
		key: string;
		timestamp: number;
	}

	export let keystrokes: Keystroke[] = [];

	let mChart: Chart;

	function handleKeyDown(event: KeyboardEvent) {
		const key = event.key;

		if (key.length > 1) return; // we ignore "control" keys

		const timestamp = new Date().getTime();
		keystrokes.push({ key, timestamp });
		renderChart();
	}

	function combineWordKeystrokes(keystrokes: Keystroke[]): Keystroke[] {
		const wordKeystrokes: Keystroke[] = [];
		let currentWord = '';
		let accumulatedTime = 0;

		const firstTimestamp = keystrokes[0].timestamp;

		for (const { key, timestamp } of keystrokes) {
			if (key === ' ') {
				if (currentWord !== '') {
					const relativeTimestamp = timestamp - firstTimestamp;
					wordKeystrokes.push({ key: currentWord, timestamp: relativeTimestamp });
					currentWord = '';
				}
			} else {
				currentWord += key;
			}
		}

		if (currentWord !== '') {
			wordKeystrokes.push({ key: currentWord, timestamp: accumulatedTime });
		}

		return wordKeystrokes;
	}

	function renderChart() {
		if (mChart) mChart.destroy();

		const data: any = {
			labels: [],
			datasets: [
				{
					label: 'Time Between Keystrokes',
					data: [],
					borderColor: 'rgba(75, 192, 192, 1)',
					fill: false
				}
			]
		};

		const ks = combineWordKeystrokes(keystrokes);

		for (let i = 1; i < ks.length; i++) {
			const timeDiff = ks[i].timestamp - ks[i - 1].timestamp;
			data.labels.push(ks[i].key);
		
			if (timeDiff<0) break;
		
			const renderTime= (timeDiff) / 1000
			
			data.datasets[0].data.push(renderTime);
		}

		const ctx = document.getElementById('chart') as HTMLCanvasElement;
		mChart = new Chart(ctx, {
			type: 'line',
			data,
			options: {
				animation: {
        duration: 0
    },
				scales: {
					y: {
						title: {
							display: true,
							text: 'Time (s)'
						}
					}
				}
			}
		});
	}

	onMount(() => {
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

<canvas id="chart" />

<style>
	canvas {
		background: white;
	}
</style>
