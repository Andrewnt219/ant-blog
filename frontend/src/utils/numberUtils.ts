export const padZero = (number: number): string => {
	return number.toString().padStart(2, "0");
};

export function getRandomNumberExclusive(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}

export function getRandomIntegerExclusive(min: number, max: number): number {
	return Math.floor(getRandomNumberExclusive(min, max));
}

export function getRandomNumberInclusive(min: number, max: number): number {
	return Math.random() * (max - min + 1) + min;
}

export function getRandomIntegerInclusive(min: number, max: number): number {
	return Math.floor(getRandomNumberInclusive(min, max));
}
