import Document, {
	DocumentContext,
	NextScript,
	Main,
	Html,
	Head,
} from "next/document";
import { ReactElement } from "react";
import { ServerStyleSheet } from "styled-components";

type GetInitialPropsReturn = {
	styles: ReactElement;
	html: string;
	head?: (ReactElement | null)[] | undefined;
};

// TODO Check server render style
export default class MyDocument extends Document {
	static async getInitialProps(
		ctx: DocumentContext
	): Promise<GetInitialPropsReturn> {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;
		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				});
			const initialProps = await Document.getInitialProps(ctx);

			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}

	render(): ReactElement {
		return (
			<Html lang="en">
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
