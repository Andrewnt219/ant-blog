import { STYLE_CONSTANTS } from "@src/assets/constants/StyleConstants";
import { createGlobalStyle } from "styled-components";

import typographyStyle from "./typographyStyle";

export default createGlobalStyle`
:root {
    --accent-color: #2d53fe;
    --accent-color-rgb: 45, 83, 254;
    --accent-color-light: #7A93FF;
    --accent-color-light-rgb: 122, 147, 255;
    --primary-color: #fff;
    --primary-color-rgb:   255, 255, 255;
    --primary-color-light: #F6f6f6;
    --primary-color-light-rgb: 246, 248, 254;
    --text-color: #000;
    --text-color-rgb: 0, 0, 0;
    --text-color-light: #717172;
    --text-color-light-rgb: 113, 113, 114;
    --border-color: #ddd;
    --border-color-rgb: 221, 221, 221;
    --border-color-light: #ebebeb;
    --border-color-light-rgb: 235, 235, 235;
        
    box-sizing: border-box;
    scroll-behavior: smooth;  
}

html, body {
    width: 100%;
    height: 100%; 
    overflow-x: hidden;
}

body {
    color: var(--text-color);
}

*, *::before, *::after {
    margin: 0;
    padding: 0;
    text-decoration: none;
    list-style: none;
    box-sizing: inherit;
}

input,
select,
textarea {
    font-size: inherit;
    font-family: inherit;
    background: transparent;
}

#__next {
    background: var(--primary-color);
    transition: all 1000ms ease;
    position: relative;
    padding-bottom: calc( ${STYLE_CONSTANTS.footerHeight} + 5rem);
    min-height: 100%;
}

.no-scroll {
    overflow-y: hidden;
}

/* Margin between slides */
.slick-slide > div {
  padding: 0 0.25rem;
}

${typographyStyle}

/* NProgress */
#nprogress .bar.bar {
    background: var(--accent-color);
}

/* * { background-color: rgba(255,0,0,.2); }
* * { background-color: rgba(0,255,0,.2); }
* * * { background-color: rgba(0,0,255,.2); }
* * * * { background-color: rgba(255,0,255,.2); }
* * * * * { background-color: rgba(0,255,255,.2); }
* * * * * * { background-color: rgba(255,255,0,.2); }
* * * * * * * { background-color: rgba(255,0,0,.2); }
* * * * * * * * { background-color: rgba(0,255,0,.2); }
* * * * * * * * * { background-color: rgba(0,0,255,.2); } */
`;
