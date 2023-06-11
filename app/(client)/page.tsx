'use client';
import Feed from '@components/Feed';
import { desc } from '@lib/desc';
import logo from '@public/assets/images/thops3.png';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const getAll = async () => {
	const res = await fetch(`/api/prompt`);
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
		<section className='flex flex-col items-center justify-center '>
			<div className='mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-2'>
				<h1 className='text-normal text-center font-mono tracking-wider text-gray-800 '>{desc}</h1>
				<Image src={logo} alt='logo' className='object-contain blur-0' blurDataURL='data:...' placeholder='blur' />
			</div>
			<Feed postData={data} setData={undefined} />
		</section>
	);
};
export default Home;
