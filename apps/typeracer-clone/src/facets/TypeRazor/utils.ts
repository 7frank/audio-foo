export function findFirstDifference(text1: string, text2: string) {
	const length = Math.min(text1.length, text2.length);

	for (let i = 0; i < length; i++) {
		if (text1[i] !== text2[i]) {
			return { diffPos: i, isSame: false };
		}
	}

	// If the loop completes without finding a difference,
	// check if the lengths of the texts are different
	if (text1.length !== text2.length) {
		return { diffPos: length, isSame: false };
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
