'use client';
import Feed from '@components/Feed';
import { desc } from '@lib/desc';
import logo from '@public/assets/images/thops3.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const getAllData = async () => {
	const res = await fetch('/api/prompt');
	if (res.status === 304) {
		// Resource not modified, no need to update the data
		return;
	}
	return res.json();
};

const Home = () => {
	const [postData, setData] = useState([]);

	useEffect(() => {
		const controller = new AbortController();
		const fetchAll = async () => {
			const data = await getAllData();
			setData(data.reverse());
		};
		fetchAll();
		return () => {
			// cancel the request before component unmounts
			controller.abort();
		};
	}, [postData]);

	return (
		<section className='flex flex-col items-center justify-center w-full'>
			<div className='flex w-full max-w-7xl flex-col items-center justify-center gap-2'>
				<h1 className='text-normal text-center font-mono tracking-wider text-gray-800 '>{desc}</h1>
				<Image src={logo} alt='logo' className='object-contain blur-0' blurDataURL='data:...' placeholder='blur' />
			</div>
			<Feed postData={postData} />
		</section>
	);
};
export default Home;
