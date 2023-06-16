import Nav from '@components/Nav';
import { Provider } from '@components/Provider';
import '@styles/globals.css';
import Head from 'next/head';

export const metadata = {
	title: 'Code Alpha',
	description: 'Share AI Search',
};

const RootLayout = ({ children }: any) => {
	return (
		<html lang='eng'>
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
