import 'tailwindcss/dist/base.min.css';

import { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { GlobalStyles } from 'twin.macro';

import MainLayout from '@src/layouts/MainLayout';
import GlobalStyle from '@src/styles/GlobalStyle';

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
