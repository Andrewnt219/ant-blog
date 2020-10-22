import "tailwindcss/dist/base.min.css";
import { AppProps } from "next/app";
import { ReactNode } from "react";
import GlobalStyle from "@src/styles/GlobalStyle";

function MyApp({ Component, pageProps }: AppProps): ReactNode {
	return (
		<>
			<GlobalStyle />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
