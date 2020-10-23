import { theme, css } from "twin.macro";

export default css`
	:root {
		font-family: "Montserrat", serif;

		/* montserrat-300 - vietnamese_latin */
		@font-face {
			font-family: "Montserrat";
			font-style: normal;
			font-weight: 300;
			src: local("Montserrat Light"), local("Montserrat-Light"),
				url("/fonts/montserrat-v15-vietnamese_latin-300.woff2") format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/montserrat-v15-vietnamese_latin-300.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}
		/* montserrat-300italic - vietnamese_latin */
		@font-face {
			font-family: "Montserrat";
			font-style: italic;
			font-weight: 300;
			src: local("Montserrat Light Italic"), local("Montserrat-LightItalic"),
				url("/fonts/montserrat-v15-vietnamese_latin-300italic.woff2")
					format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/montserrat-v15-vietnamese_latin-300italic.woff")
					format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}
		/* montserrat-regular - vietnamese_latin */
		@font-face {
			font-family: "Montserrat";
			font-style: normal;
			font-weight: 400;
			src: local("Montserrat Regular"), local("Montserrat-Regular"),
				url("/fonts/montserrat-v15-vietnamese_latin-regular.woff2")
					format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/montserrat-v15-vietnamese_latin-regular.woff")
					format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}
		/* montserrat-italic - vietnamese_latin */
		@font-face {
			font-family: "Montserrat";
			font-style: italic;
			font-weight: 400;
			src: local("Montserrat Italic"), local("Montserrat-Italic"),
				url("/fonts/montserrat-v15-vietnamese_latin-italic.woff2")
					format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/montserrat-v15-vietnamese_latin-italic.woff")
					format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}
		/* montserrat-500 - vietnamese_latin */
		@font-face {
			font-family: "Montserrat";
			font-style: normal;
			font-weight: 500;
			src: local("Montserrat Medium"), local("Montserrat-Medium"),
				url("/fonts/montserrat-v15-vietnamese_latin-500.woff2") format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/montserrat-v15-vietnamese_latin-500.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}
		/* montserrat-500italic - vietnamese_latin */
		@font-face {
			font-family: "Montserrat";
			font-style: italic;
			font-weight: 500;
			src: local("Montserrat Medium Italic"), local("Montserrat-MediumItalic"),
				url("/fonts/montserrat-v15-vietnamese_latin-500italic.woff2")
					format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/montserrat-v15-vietnamese_latin-500italic.woff")
					format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}
		/* montserrat-600 - vietnamese_latin */
		@font-face {
			font-family: "Montserrat";
			font-style: normal;
			font-weight: 600;
			src: local("Montserrat SemiBold"), local("Montserrat-SemiBold"),
				url("/fonts/montserrat-v15-vietnamese_latin-600.woff2") format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/montserrat-v15-vietnamese_latin-600.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}
		/* montserrat-600italic - vietnamese_latin */
		@font-face {
			font-family: "Montserrat";
			font-style: italic;
			font-weight: 600;
			src: local("Montserrat SemiBold Italic"),
				local("Montserrat-SemiBoldItalic"),
				url("/fonts/montserrat-v15-vietnamese_latin-600italic.woff2")
					format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/montserrat-v15-vietnamese_latin-600italic.woff")
					format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}
		/* montserrat-700 - vietnamese_latin */
		@font-face {
			font-family: "Montserrat";
			font-style: normal;
			font-weight: 700;
			src: local("Montserrat Bold"), local("Montserrat-Bold"),
				url("/fonts/montserrat-v15-vietnamese_latin-700.woff2") format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/montserrat-v15-vietnamese_latin-700.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}
		/* montserrat-700italic - vietnamese_latin */
		@font-face {
			font-family: "Montserrat";
			font-style: italic;
			font-weight: 700;
			src: local("Montserrat Bold Italic"), local("Montserrat-BoldItalic"),
				url("/fonts/montserrat-v15-vietnamese_latin-700italic.woff2")
					format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/montserrat-v15-vietnamese_latin-700italic.woff")
					format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}

		/* nunito-regular - vietnamese_latin */
		@font-face {
			font-family: "Nunito";
			font-style: normal;
			font-weight: 400;
			src: local("Nunito Regular"), local("Nunito-Regular"),
				url("/fonts/nunito-v14-vietnamese_latin-regular.woff2") format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/nunito-v14-vietnamese_latin-regular.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}
		/* nunito-italic - vietnamese_latin */
		@font-face {
			font-family: "Nunito";
			font-style: italic;
			font-weight: 400;
			src: local("Nunito Italic"), local("Nunito-Italic"),
				url("/fonts/nunito-v14-vietnamese_latin-italic.woff2") format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/nunito-v14-vietnamese_latin-italic.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}
		/* nunito-700 - vietnamese_latin */
		@font-face {
			font-family: "Nunito";
			font-style: normal;
			font-weight: 700;
			src: local("Nunito Bold"), local("Nunito-Bold"),
				url("/fonts/nunito-v14-vietnamese_latin-700.woff2") format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/nunito-v14-vietnamese_latin-700.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}
		/* nunito-700italic - vietnamese_latin */
		@font-face {
			font-family: "Nunito";
			font-style: italic;
			font-weight: 700;
			src: local("Nunito Bold Italic"), local("Nunito-BoldItalic"),
				url("/fonts/nunito-v14-vietnamese_latin-700italic.woff2")
					format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/nunito-v14-vietnamese_latin-700italic.woff")
					format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}
		/* nunito-900 - vietnamese_latin */
		@font-face {
			font-family: "Nunito";
			font-style: normal;
			font-weight: 900;
			src: local("Nunito Black"), local("Nunito-Black"),
				url("/fonts/nunito-v14-vietnamese_latin-900.woff2") format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/nunito-v14-vietnamese_latin-900.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
		}
		/* nunito-900italic - vietnamese_latin */
		@font-face {
			font-family: "Nunito";
			font-style: italic;
			font-weight: 900;
			src: local("Nunito Black Italic"), local("Nunito-BlackItalic"),
				url("/fonts/nunito-v14-vietnamese_latin-900italic.woff2")
					format("woff2"),
				/* Chrome 26+, Opera 23+, Firefox 39+ */
					url("/fonts/nunito-v14-vietnamese_latin-900italic.woff")
					format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
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
		font-family: "Nunito", sans-serif;
		font-weight: 700;
	}

	p {
		line-height: 2;
	}
`;
