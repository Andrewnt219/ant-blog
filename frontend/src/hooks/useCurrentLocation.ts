import { useEffect, useState } from "react";

export const useCurrentLocation = (): Location | undefined => {
	const [currentLocation, setCurrentLocation] = useState<Location>();

	useEffect(() => {
		setCurrentLocation(window.location);
	}, []);

	return currentLocation;
};
