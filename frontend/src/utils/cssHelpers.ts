import { css, theme } from 'twin.macro';

import { SizeKey } from '@src/assets/constants/StyleConstants';

export const lqipBackground = (lqip: string) => css`
	background-image: url(${lqip});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
`;

export const responsiveBackground = (
	sources: Map<SizeKey, string | null>,
	additional?: string
) => css`
	@media screen and (min-width: ${theme`screens.mdMobile`}) {
		background-image: ${additional ? additional + ", " : null}
			url("${sources.get(320)}");
	}

	@media screen and (min-width: ${theme`screens.lgMobile`}) {
		background-image: ${additional ? additional + ", " : null}
			url("${sources.get(420)}");
	}

	@media screen and (min-width: ${theme`screens.mdTablet`}) {
		background-image: ${additional ? additional + ", " : null}
			url("${sources.get(768)}");
	}

	@media screen and (min-width: ${theme`screens.lgTablet`}) {
		background-image: ${additional ? additional + ", " : null}
			url("${sources.get(1024)}");
	}

	@media screen and (min-width: ${theme`screens.smDesktop`}) {
		background-image: ${additional ? additional + ", " : null}
			url("${sources.get(1200)}");
	}

	@media screen and (min-width: ${theme`screens.mdDesktop`}) {
		background-image: ${additional ? additional + ", " : null}
			url("${sources.get(1600)}");
	}

	@media screen and (min-width: ${theme`screens.lgDesktop`}) {
		background-image: ${additional ? additional + ", " : null}
			url("${sources.get(1920)}");
	}

	@media screen and (min-width: ${theme`screens.wqhd`}) {
		background-image: ${additional ? additional + ", " : null}
			url("${sources.get(2560)}");
	}

	@media screen and (min-width: ${theme`screens.uhd4`}) {
		background-image: ${additional ? additional + ", " : null}
			url("${sources.get(3840)}");
	}

	@media screen and (min-width: ${theme`screens.uhd5`}) {
		background-image: ${additional ? additional + ", " : null}
			url("${sources.get(5120)}");
	}

	@media screen and (min-width: ${theme`screens.uhd8`}) {
		background-image: ${additional ? additional + ", " : null}
			url("${sources.get(7680)}");
	}
`;

export const absoluteFullSize = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;
