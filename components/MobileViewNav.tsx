import Image from 'next/image';
import logo from '@public/assets/images/thops3.png';
import { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

type Props = {
	provider: any;
	signOut: any;
	signIn: any;
};
const MobileViewNav = ({ provider, signOut, signIn }: Props) => {
	const [dropDown, setDropDown] = useState(false);
	const login = true;
	return (
		<div className='sm:hidden flex relative mx-3'>
			{provider?.user ? (
				<div className='flex'>
					<Image
						src={logo}
						alt='logo'
						className='rounded-full blur-0 object-contain h-12 w-12 border border-black '
						width={100}
						height={100}
						onClick={() => setDropDown((prev) => !prev)}
					/>
					{dropDown && (
						<div className='absolute right-0 top-full mt-3 w-screen p-5 rounded-lg h-screen flex flex-col gap-2 z-40 backdrop-blur justify-start items-center'>
							<Link href='/profile' onClick={() => setDropDown(false)} className='capitalize font-bold tracking-wide  h-12'>
								my profile
							</Link>
							<Link href='/create-prompt' className=' capitalize font-bold tracking-wide h-12' onClick={() => setDropDown(false)}>
								create post
							</Link>
							<button
								type='button'
								className='capitalize font-bold tracking-wide h-12 bg-black text-white rounded-full px-5 py-3'
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

					<button onClick={() => signIn()} className='text-white rounded-full bg-black px-5 py-3 font-bold tracking-wide h-12'>
						Sign In
					</button>
				</>
			)}
		</div>
	);
};

export default MobileViewNav;
