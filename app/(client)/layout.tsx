import Nav from '@components/Nav';
import { Provider } from '@components/Provider';
import '@styles/globals.css';

export const metadata = {
	title: 'Share',
	description: 'Share AI Search',
};

const RootLayout = ({ children }: any) => {
	return (
		<html lang='eng'>
			<body className='inset-0 m-0 mx-auto max-w-7xl bg-gray-200 p-0 '>
				<Provider>
					<Nav />
					<main className='font-font-satoshi antialiased'>{children}</main>
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;
