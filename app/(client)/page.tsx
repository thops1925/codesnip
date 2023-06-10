'use client';
import Feed from '@components/Feed';
import { desc } from '@lib/desc';
import logo from '@public/assets/images/thops3.png';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const getAll = async () => {
	const res = await fetch(`/api/prompt`, { next: { revalidate: 30 } });
	return res.json();
};

const Home = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const controller = new AbortController();
		const getAllData = async () => {
			const postData = await getAll();
			setData(postData.reverse());
		};
		getAllData();
		return () => {
			// cancel the request before component unmounts
			controller.abort();
		};
	}, []);

	return (
		<section className='flex justify-center items-center flex-col '>
			<div className='mx-auto w-full max-w-7xl flex justify-center items-center flex-row gap-2'>
				<h1 className='text-normal font-mono text-center tracking-wider text-gray-800 '>{desc}</h1>
				<Image src={logo} alt='logo' className='blur-0 object-contain' blurDataURL='data:...' placeholder='blur' />
			</div>
			<Feed postData={data} setData={setData} />
		</section>
	);
};
export default Home;
