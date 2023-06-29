export function findFirstDifference(wholeText: string, partialText: string) {
	const length = Math.min(wholeText.length, partialText.length);

	const hasError = wholeText.indexOf(partialText) == -1;

	for (let i = 0; i < length; i++) {
		if (wholeText[i] !== partialText[i]) {
			return { diffPos: i, isSame: false, hasError };
		}
	}

	// If the loop completes without finding a difference,
	// check if the lengths of the texts are different
	if (wholeText.length !== partialText.length) {
		return { diffPos: length, isSame: false, hasError };
	}

	// If the lengths and all characters are the same, return -1
	return { diffPos: length, isSame: true };
}
export function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function delay(time: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
}
