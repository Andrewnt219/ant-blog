import { css } from "twin.macro";

const bodyFontImport = css`
	/* lora-regular - vietnamese */
	@font-face {
		font-display: swap;
		font-family: "Lora";
		font-style: normal;
		font-weight: 400;
		src: local(""),
			url("/fonts/lora-v16-vietnamese-regular.woff2") format("woff2"),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url("/fonts/lora-v16-vietnamese-regular.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* lora-500 - vietnamese */
	@font-face {
		font-display: swap;
		font-family: "Lora";
		font-style: normal;
		font-weight: 500;
		src: local(""), url("/fonts/lora-v16-vietnamese-500.woff2") format("woff2"),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url("/fonts/lora-v16-vietnamese-500.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* lora-700 - vietnamese */
	@font-face {
		font-display: swap;
		font-family: "Lora";
		font-style: normal;
		font-weight: 700;
		src: local(""), url("/fonts/lora-v16-vietnamese-700.woff2") format("woff2"),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url("/fonts/lora-v16-vietnamese-700.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* lora-italic - vietnamese */
	@font-face {
		font-display: swap;
		font-family: "Lora";
		font-style: italic;
		font-weight: 400;
		src: local(""),
			url("/fonts/lora-v16-vietnamese-italic.woff2") format("woff2"),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url("/fonts/lora-v16-vietnamese-italic.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* lora-500italic - vietnamese */
	@font-face {
		font-display: swap;
		font-family: "Lora";
		font-style: italic;
		font-weight: 500;
		src: local(""),
			url("/fonts/lora-v16-vietnamese-500italic.woff2") format("woff2"),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url("/fonts/lora-v16-vietnamese-500italic.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* lora-700italic - vietnamese */
	@font-face {
		font-display: swap;
		font-family: "Lora";
		font-style: italic;
		font-weight: 700;
		src: local(""),
			url("/fonts/lora-v16-vietnamese-700italic.woff2") format("woff2"),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url("/fonts/lora-v16-vietnamese-700italic.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
`;

const headingFontImport = css`
	/* roboto-300 - vietnamese */
	@font-face {
		font-display: swap;
		font-family: "Roboto";
		font-style: normal;
		font-weight: 300;
		src: local(""),
			url("/fonts/roboto-v20-vietnamese-300.woff2") format("woff2"),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url("/fonts/roboto-v20-vietnamese-300.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}

	/* roboto-italic - vietnamese */
	@font-face {
		font-display: swap;
		font-family: "Roboto";
		font-style: italic;
		font-weight: 400;
		src: local("Roboto Italic"), local("Roboto-Italic"),
			url("/fonts/roboto-v20-vietnamese-italic.woff2") format("woff2"),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url("/fonts/roboto-v20-vietnamese-italic.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* roboto-regular - vietnamese */
	@font-face {
		font-display: swap;
		font-family: "Roboto";
		font-style: normal;
		font-weight: 400;
		src: local("Roboto"), local("Roboto-Regular"),
			url("/fonts/roboto-v20-vietnamese-regular.woff2") format("woff2"),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url("/fonts/roboto-v20-vietnamese-regular.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* roboto-500 - vietnamese */
	@font-face {
		font-display: swap;
		font-family: "Roboto";
		font-style: normal;
		font-weight: 500;
		src: local("Roboto Medium"), local("Roboto-Medium"),
			url("/fonts/roboto-v20-vietnamese-500.woff2") format("woff2"),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url("/fonts/roboto-v20-vietnamese-500.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* roboto-700 - vietnamese */
	@font-face {
		font-display: swap;
		font-family: "Roboto";
		font-style: normal;
		font-weight: 700;
		src: local("Roboto Bold"), local("Roboto-Bold"),
			url("/fonts/roboto-v20-vietnamese-700.woff2") format("woff2"),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url("/fonts/roboto-v20-vietnamese-700.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* roboto-500italic - vietnamese */
	@font-face {
		font-display: swap;
		font-family: "Roboto";
		font-style: italic;
		font-weight: 500;
		src: local("Roboto Medium Italic"), local("Roboto-MediumItalic"),
			url("/fonts/roboto-v20-vietnamese-500italic.woff2") format("woff2"),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url("/fonts/roboto-v20-vietnamese-500italic.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* roboto-700italic - vietnamese */
	@font-face {
		font-display: swap;
		font-family: "Roboto";
		font-style: italic;
		font-weight: 700;
		src: local("Roboto Bold Italic"), local("Roboto-BoldItalic"),
			url("/fonts/roboto-v20-vietnamese-700italic.woff2") format("woff2"),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url("/fonts/roboto-v20-vietnamese-700italic.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* roboto-900 - vietnamese */
	@font-face {
		font-display: swap;
		font-family: "Roboto";
		font-style: normal;
		font-weight: 900;
		src: local("Roboto Black"), local("Roboto-Black"),
			url("/fonts/roboto-v20-vietnamese-900.woff2") format("woff2"),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url("/fonts/roboto-v20-vietnamese-900.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* roboto-900italic - vietnamese */
	@font-face {
		font-display: swap;
		font-family: "Roboto";
		font-style: italic;
		font-weight: 900;
		src: local("Roboto Black Italic"), local("Roboto-BlackItalic"),
			url("/fonts/roboto-v20-vietnamese-900italic.woff2") format("woff2"),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url("/fonts/roboto-v20-vietnamese-900italic.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
`;

const blockquoteFontImport = css`
	/* ibm-plex-serif-500 - vietnamese_latin */
	@font-face {
		font-display: swap;
		font-family: "IBM Plex Serif";
		font-style: normal;
		font-weight: 500;
		src: local("IBM Plex Serif Medium"), local("IBMPlexSerif-Medium"),
			url("/fonts/ibm-plex-serif-v9-vietnamese_latin-500.woff2") format("woff2"),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url("/fonts/ibm-plex-serif-v9-vietnamese_latin-500.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	/* ibm-plex-serif-500italic - vietnamese_latin */
	@font-face {
		font-display: swap;
		font-family: "IBM Plex Serif";
		font-style: italic;
		font-weight: 500;
		src: local("IBM Plex Serif Medium Italic"),
			local("IBMPlexSerif-MediumItalic"),
			url("/fonts/ibm-plex-serif-v9-vietnamese_latin-500italic.woff2")
				format("woff2"),
			/* Chrome 26+, Opera 23+, Firefox 39+ */
				url("/fonts/ibm-plex-serif-v9-vietnamese_latin-500italic.woff")
				format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
`;

export default css`
	:root {
		font-family: "Roboto", sans-serif;
		font-size: max(100%, 1.25vw);

		line-height: 1.8;

		${bodyFontImport}
		${headingFontImport}
		${blockquoteFontImport}
	}

	blockquote {
		font-family: "IBM Plex Serif", serif;
		font-weight: 500;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-weight: 700;
		line-height: 1.4;
	}

	h1 {
		font-size: 2.4rem;
	}

	h2 {
		font-size: 1rem;
	}
`;
