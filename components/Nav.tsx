'use client';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/assets/images/thops3.png';
import DesktopNav from './DesktopNav';
import MobileViewNav from './MobileViewNav';

import { useEffect, useState } from 'react';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';

const Nav = () => {
	const { data: session } = useSession();

	const [provider, setProvider] = useState(null);

	useEffect(() => {
		(async () => {
			const res: any = await getProviders();
			setProvider(res);
		})();
	}, []);

	return (
		<nav className='flex justify-between items-center '>
			<Link href='/' className='flex justify-center items-center'>
				<Image src={logo} alt='logo' className='object-contain h-14 w-24 lg:h-20 lg:w-24 blur-0' />
			</Link>
			<DesktopNav providers={provider} signOut={signOut} signIn={signIn} />
			<MobileViewNav provider={session} signOut={signOut} signIn={signIn} />
		</nav>
	);
};

export default Nav;
