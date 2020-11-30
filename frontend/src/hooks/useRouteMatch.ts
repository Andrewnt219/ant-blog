import { useRouter } from 'next/router';

/**
 * @param linkHref the href of the link
 * @param exact on = matches exactly / off = matches subpath also
 */
export const useRouteMatch = (linkHref: string, exact?: boolean): boolean => {
	const { pathname } = useRouter();
	let isActive = false;

	if (exact) {
		isActive = pathname === linkHref;
	} else {
		isActive = pathname.startsWith(linkHref);
	}

	return isActive;
};
