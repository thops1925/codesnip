import Nav from '@app/components/Nav';
import { Provider } from '@app/components/Provider';
import '@styles/globals.css';
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import Head from 'next/head';

export const metadata: Metadata = {
	title: {
		default: 'Code Alpha',
		template: '%s | Next.js App Router',
	},
	description: 'Code Snippet Sharing',
};

const RootLayout = ({ children }: any) => {
	return (
		<html lang='eng' suppressHydrationWarning={true}>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>

			<body className='inset-0 m-0 mx-auto max-w-7xl bg-gray-200 p-0 min-w-fit'>
				<Provider>
					<Nav />
					<main className='font-font-satoshi antialiased'>{children}</main>
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;
