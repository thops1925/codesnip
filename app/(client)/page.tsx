import Feed from '@components/Feed';
import { desc } from '@lib/desc';
import logo from '@public/assets/images/thops3.png';
import { Hydrate, QueryClient, dehydrate } from '@tanstack/react-query';
import Image from 'next/image';

async function getData() {
	const res = await fetch('http://localhost:3000//api/prompt');
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json();
}

const Home = async () => {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(['prompt'], getData);
	const dehydratedState = dehydrate(queryClient);

	console.log(dehydratedState);
	return (
		<section className='flex flex-col items-center justify-center w-full'>
			<div className='flex w-full max-w-7xl flex-col items-center justify-center gap-2'>
				<h1 className='text-normal text-center font-mono tracking-wider text-gray-800 '>{desc}</h1>
				<Image src={logo} alt='logo' className='object-contain blur-0' blurDataURL='data:...' placeholder='blur' />
			</div>
			<Hydrate state={dehydratedState}>
				<Feed />
			</Hydrate>
		</section>
	);
};

export default Home;
