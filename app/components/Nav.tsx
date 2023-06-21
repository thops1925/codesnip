'use client';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@public/assets/images/thops3.png';
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
		<nav className='flex items-center justify-between my-4'>
			<Link href='/' className='flex items-center justify-center'>
				<Image src={logo} alt='logo' className='h-14 w-24 object-contain blur-0 lg:h-20 lg:w-24' />
			</Link>
			<DesktopNav providers={provider} signOut={signOut} signIn={signIn} />
			<MobileViewNav provider={session} signOut={signOut} signIn={signIn} />
		</nav>
	);
};

export default Nav;
