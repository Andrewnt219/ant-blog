import { useEffect, useState } from "react";

export const useCurrentLocation = (): string => {
	const [currentLocation, setCurrentLocation] = useState<string>("");

	useEffect(() => {
		setCurrentLocation(window.location.href);
	}, []);

	return currentLocation;
};
