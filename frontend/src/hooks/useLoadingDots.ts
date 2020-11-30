import { useEffect, useState } from 'react';

type Props = {
	intervalInMs: number;
	placeholder?: string;
	length?: number;
};

export const useLoadingDots = ({
	intervalInMs,
	placeholder,
	length,
}: Props): string => {
	const [dots, setDots] = useState<string>("");

	useEffect(() => {
		const id = setInterval(() => {
			setDots((prev) => {
				if (prev.length === (length ?? 3)) {
					return "";
				}

				return prev.concat(placeholder ?? ".");
			});
		}, intervalInMs);

		return () => clearInterval(id);
	}, [intervalInMs, length, placeholder]);

	return dots;
};
