import { useRouter } from "next/router";

/**
 * @param linkHref the href of the link
 * @param exact on = matches exactly / off = matches subpath also
 */
export const useRouteMatch = (linkHref: string, exact?: boolean): boolean => {
	const { asPath } = useRouter();
	let isActive = false;

	if (exact) {
		isActive = asPath === linkHref;
	} else {
		isActive = asPath.startsWith(linkHref);
	}

	return isActive;
};
