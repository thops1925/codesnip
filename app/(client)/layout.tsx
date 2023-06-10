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
			<body className='max-w-7xl mx-auto bg-gray-200 pb-32'>
				<Provider>
					<Nav />
					<main className='antialiased font-font-satoshi'>{children}</main>
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;
