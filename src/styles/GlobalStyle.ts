import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import typographyStyle from "./typographyStyle";

export default createGlobalStyle`
${normalize}

:root {
    --accent-color: #006ae6;
    --accent-color-rgb: 0, 106, 230;
    --primary-color: #fff;
    --primary-color-rgb:   255, 255, 255;
    --primary-color-light: #F6F8FE;
    --primary-color-light-rgb: 246, 248, 254;
    --secondary-color: #751bba;
    --secondary-color-rgb: 117, 27, 186;
    --text-color: #000;
    --text-color-rgb: 0, 0, 0;
    --text-color-light: #717172;
    --text-color-light-rgb: 113, 113, 114;
    --border-color: #d6dbe6;
    box-sizing: border-box;
    scroll-behavior: smooth;  
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
}

.no-scroll {
    overflow-y: hidden;
}

${typographyStyle}

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
