/**
 * @description with 265 WPM, calculate reading minutes from pargraph(s)
 */
export const calculateReadingMinutes = (text: string): string => {
	const wordsCount: number = JSON.stringify(text).split(" ").length;
	const READING_SPEED = 265;
	const readingMinutes = Math.floor(wordsCount / READING_SPEED);

	return readingMinutes < 1 ? "1 min read" : readingMinutes + " mins read";
};

/**
 * Trim the last word from a string
 *
 * @param string the string to be trimmed
 * @param separator the separator of words in the given string
 * @returns the pair of head and tail of the string, head is empty if the string only has one word
 */
export const trimLastWord = (string: string, separator = " ") => {
	const lastIndex = string.lastIndexOf(separator);
	const head = string.substring(0, lastIndex).trim();
	const tail = string.substring(lastIndex).trim();
	return [head, tail];
};

/**
 * Render the block content to raw string
 *
 * @param blocks the body from Sanity's portable text editor
 * @param opts Not sure how to use this
 */
export function blocksToText(blocks: any, opts = {}): string {
	const defaults = { nonTextBehavior: "remove" };
	const options = Object.assign({}, defaults, opts);

	if (!Array.isArray(blocks)) {
		return "";
	}

	return blocks
		.map((block: any) => {
			if (block._type !== "block" || !block.children) {
				return options.nonTextBehavior === "remove"
					? ""
					: `[${block._type} block]`;
			}

			if (!Array.isArray(block.children)) {
				return "";
			}

			return block.children.map((child: any) => child.text).join("");
		})
		.join("\n\n");
}
