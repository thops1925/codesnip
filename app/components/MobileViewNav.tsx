import Image from 'next/image';
import logo from '@public/assets/images/thops3.png';
import { useState } from 'react';
import Link from 'next/link';

type Props = {
	provider: any;
	signOut: any;
	signIn: any;
};
const MobileViewNav = ({ provider, signOut, signIn }: Props) => {
	const [dropDown, setDropDown] = useState(false);
	return (
		<div className='relative mx-3 flex sm:hidden'>
			{provider?.user ? (
				<div className='flex'>
					<Image
						src={logo}
						alt='logo'
						className='h-12 w-12 rounded-full border border-black object-contain blur-0 '
						width={100}
						height={100}
						onClick={() => setDropDown((prev) => !prev)}
					/>
					{dropDown && (
						<div className='absolute right-0 top-full z-40 mt-3 flex h-screen w-screen flex-col items-center justify-start gap-2 rounded-lg p-5 backdrop-blur'>
							<Link href='/profile' onClick={() => setDropDown(false)} className='h-12 font-bold capitalize  tracking-wide'>
								my profile
							</Link>
							<Link href='/create-prompt' className=' h-12 font-bold capitalize tracking-wide' onClick={() => setDropDown(false)}>
								Create Post
							</Link>
							<button
								type='button'
								className='h-12 rounded-full bg-black px-5 py-3 font-bold capitalize tracking-wide text-white'
								onClick={() => {
									setDropDown(false);
									signOut();
								}}>
								Sign out
							</button>
						</div>
					)}
				</div>
			) : (
				<>
					{/* <button
						type='button'
						key={provider.name}
						onClick={() => signIn(provider.id)}
						className='text-white rounded-full bg-black px-5 py-3 font-bold tracking-wide h-12'>
						Sign In
					</button> */}

					<button onClick={() => signIn()} className='h-12 rounded-full bg-black px-5 py-3 font-bold tracking-wide text-white'>
						Sign In
					</button>
				</>
			)}
		</div>
	);
};

export default MobileViewNav;
