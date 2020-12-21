import "tailwindcss/dist/base.min.css";

import { AppProps } from "next/app";
import { ReactNode } from "react";
import { GlobalStyles } from "twin.macro";

import MainLayout from "@src/layouts/MainLayout";
import GlobalStyle from "@src/styles/GlobalStyle";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Router } from "next/router";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => {
	NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
	NProgress.done();
});
Router.events.on("routeChangeError", () => {
	NProgress.done();
});

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
