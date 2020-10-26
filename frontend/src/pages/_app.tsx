import "tailwindcss/dist/base.min.css";
import { AppProps } from "next/app";
import { ReactNode } from "react";
import GlobalStyle from "@src/styles/GlobalStyle";
import MainLayout from "@src/layouts/MainLayout/MainLayout";
import { GlobalStyles } from "twin.macro";

function MyApp({ Component, pageProps }: AppProps): ReactNode {
	return (
		<>
			<GlobalStyles />
			<GlobalStyle />
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</>
	);
}

export default MyApp;
