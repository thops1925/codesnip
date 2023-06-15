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
			{/* <head>
				<title>Generate icons using AI!</title>
				<meta name='description' content='Checkout this awesome icon I made!' />
				<link rel='icon' href='/favicon.ico' />
				<meta property='og:image' content={``} />
				<meta property='og:title' content={`Icon Preview for `} />
				<meta property='og:description' content='Checkout this awesome icon AI generated for me!' />
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:site' content='@thops' />
				<meta name='twitter:title' content={`Icon Preview for `} />
				<meta name='twitter:description' content='Checkout this awesome icon AI generated for me!' />
				<meta name='twitter:image' content={``} />
				<meta name='twitter:url' content={`https://codesnip-alpha.vercel.app`} />
			</head> */}
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
