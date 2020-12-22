import 'tailwindcss/dist/base.min.css';
import 'nprogress/nprogress.css';

import { AppProps } from 'next/app';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import { ReactNode } from 'react';
import { GlobalStyles } from 'twin.macro';

import MainLayout from '@src/layouts/MainLayout';
import GlobalStyle from '@src/styles/GlobalStyle';

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
