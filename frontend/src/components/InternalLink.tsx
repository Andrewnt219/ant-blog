import Link, { LinkProps } from 'next/link';
import React, { AnchorHTMLAttributes, ReactElement, ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
	nextLinkProps: LinkProps;
	children: ReactNode;
};

function InternalLink({
	nextLinkProps,
	children,
	...anchorProps
}: Props): ReactElement {
	return (
		<Link {...nextLinkProps} passHref>
			<StyledInternalLink {...anchorProps}>{children}</StyledInternalLink>
		</Link>
	);
}

type StyledInternalLinkProps = {};
export const StyledInternalLink = styled.a<StyledInternalLinkProps>`
	${tw`underline`}
	text-decoration-color: var(--accent-color);

	transition: text-decoration-color 200ms ease, color 200ms ease;

	:visited {
		${tw`text-ltextColor`}
		text-decoration-color: var(--text-color-light);
	}

	// NOTE must be after :visited
	:hover,
	:focus {
		text-decoration-color: transparent;
		${tw`text-accent`}
	}
`;

export default InternalLink;
