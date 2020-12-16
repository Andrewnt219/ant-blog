import { ApiError } from "api";
import Axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const useIncreasePostViews = (postId: string) => {
	const [error, setError] = useState<string | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setError(undefined);
		setLoading(true);

		Axios.patch("/api/increaseViews", { postId })
			.then((_) => setError(undefined))
			.catch((error: AxiosError<ApiError>) =>
				setError(error.response?.data.message)
			)
			.finally(() => setLoading(false));
	}, [postId]);

	return [error, loading];
};
