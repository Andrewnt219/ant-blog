import { theme, css } from "twin.macro";

export default css`
	:root {
		font-family: "PT Serif", serif;

		/* pt-serif-regular - latin */
		@font-face {
			font-family: "PT Serif";
			font-style: normal;
			font-weight: 400;
			src: local("PT Serif"), local("PTSerif-Regular"),
				url("/fonts/pt-serif-v12-latin-regular.woff2") format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/pt-serif-v12-latin-regular.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}

		/* pt-serif-700 - latin */
		@font-face {
			font-family: "PT Serif";
			font-style: normal;
			font-weight: 700;
			src: local("PT Serif Bold"), local("PTSerif-Bold"),
				url("/fonts/pt-serif-v12-latin-700.woff2") format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/pt-serif-v12-latin-700.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}

		/* pt-serif-italic - latin */
		@font-face {
			font-family: "PT Serif";
			font-style: italic;
			font-weight: 400;
			src: local("PT Serif Italic"), local("PTSerif-Italic"),
				url("/fonts/pt-serif-v12-latin-italic.woff2") format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/pt-serif-v12-latin-italic.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}
		/* pt-serif-700italic - latin */
		@font-face {
			font-family: "PT Serif";
			font-style: italic;
			font-weight: 700;
			src: local("PT Serif Bold Italic"), local("PTSerif-BoldItalic"),
				url("/fonts/pt-serif-v12-latin-700italic.woff2") format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/pt-serif-v12-latin-700italic.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}

		/* poppins-300 - latin */
		@font-face {
			font-family: "Poppins";
			font-style: normal;
			font-weight: 300;
			src: local("Poppins Light"), local("Poppins-Light"),
				url("/fonts/poppins-v13-latin-300.woff2") format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/poppins-v13-latin-300.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}

		/* poppins-regular - latin */
		@font-face {
			font-family: "Poppins";
			font-style: normal;
			font-weight: 400;
			src: local("Poppins Regular"), local("Poppins-Regular"),
				url("/fonts/poppins-v13-latin-regular.woff2") format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/poppins-v13-latin-regular.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}

		/* poppins-700 - latin */
		@font-face {
			font-family: "Poppins";
			font-style: normal;
			font-weight: 700;
			src: local("Poppins Bold"), local("Poppins-Bold"),
				url("/fonts/poppins-v13-latin-700.woff2") format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/poppins-v13-latin-700.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}

		/* poppins-900 - latin */
		@font-face {
			font-family: "Poppins";
			font-style: normal;
			font-weight: 900;
			src: local("Poppins Black"), local("Poppins-Black"),
				url("/fonts/poppins-v13-latin-900.woff2") format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/poppins-v13-latin-900.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}

		@media screen and (min-width: ${theme`screens.mdMobile`}) {
			font-size: 106.25%;
		}
		@media screen and (min-width: ${theme`screens.lgMobile`}) {
			font-size: 112.5%;
		}
		@media screen and (min-width: ${theme`screens.smTablet`}) {
			font-size: 118.75%;
		}
		@media screen and (min-width: ${theme`screens.mdTablet`}) {
			font-size: 143.75%;
		}
		@media screen and (min-width: ${theme`screens.lgTablet`}) {
			font-size: 156.25%;
		}
		@media screen and (min-width: ${theme`screens.smDesktop`}) {
			font-size: 168.75%;
		}
		@media screen and (min-width: ${theme`screens.mdDesktop`}) {
			font-size: 181.25%;
		}
		@media screen and (min-width: ${theme`screens.lgDesktop`}) {
			font-size: 231.25%;
		}
		@media screen and (min-width: ${theme`screens.wqhd`}) {
			font-size: 281.25%;
		}
		@media screen and (min-width: ${theme`screens.uhd4`}) {
			font-size: 437.5%;
		}
		@media screen and (min-width: ${theme`screens.uhd5`}) {
			font-size: 562.5%;
		}
		@media screen and (min-width: ${theme`screens.uhd8`}) {
			font-size: 875%;
		}
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: "Poppins", sans-serif;
	}
`;
