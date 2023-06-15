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
		return null;
	}

	return res.json();
};

const Home = () => {
	const [postData, setPostData] = useState([]);
	const [dataVersion, setDataVersion] = useState(0); // State to track the data version

	useEffect(() => {
		const fetchAll = async () => {
			const data = await getAllData();

			if (data) {
				setPostData(data.reverse());
				setDataVersion((prevVersion) => prevVersion + 1); // Update data version
			}
		};

		const intervalId = setInterval(fetchAll, 5000); // Fetch data every 5 seconds

		return () => {
			clearInterval(intervalId); // Clear the interval when the component unmounts
		};
	}, []); // Empty dependency array to run the effect only once

	return (
		<section className='flex flex-col items-center justify-center w-full'>
			<div className='flex w-full max-w-7xl flex-col items-center justify-center gap-2'>
				<h1 className='text-normal text-center font-mono tracking-wider text-gray-800 '>{desc}</h1>
				<Image src={logo} alt='logo' className='object-contain blur-0' blurDataURL='data:...' placeholder='blur' />
			</div>
			<Feed postData={postData} dataVersion={dataVersion} /> {/* Pass data version as prop */}
		</section>
	);
};

export default Home;
