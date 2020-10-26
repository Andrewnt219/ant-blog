/**
 * @description with 265 WPM, calculate reading minutes from pargraph(s)
 */
export const calculateReadingMinutes = (text: string): string => {
	const wordsCount: number = JSON.stringify(text).split(" ").length;
	const READING_SPEED = 265;
	const readingMinutes = Math.floor(wordsCount / READING_SPEED);

	return readingMinutes < 1 ? "1 min read" : readingMinutes + " mins read";
};

export const trimLastWord = (string: string, separator = " ") => {
	const lastIndex = string.lastIndexOf(separator);
	const head = string.substring(0, lastIndex).trim();
	const tail = string.substring(lastIndex).trim();
	return [head, tail];
};
