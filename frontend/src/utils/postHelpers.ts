export const calculateReadingMinutes = (text: string): string => {
	const wordsCount: number = JSON.stringify(text).split(" ").length;
	const READING_SPEED = 265;
	const readingMinutes = Math.floor(wordsCount / READING_SPEED);

	return readingMinutes < 1 ? "1 min read" : readingMinutes + " mins read";
};
