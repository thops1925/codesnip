/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import { PromptList } from './PromptList ';

export const getAllData = async () => {
	try {
		const res = await fetch('/api/prompt', { cache: 'no-store' });
		return res.json();
	} catch (error) {
		console.error('Error fetch', error);
	}
};

const Feed = () => {
	const [searchText, setSearchText] = useState('');
	const [searchData, setSearchData] = useState([]);
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const d = await getAllData();
			setData(d.reverse());
		};
		fetchData();
	}, []);

	useEffect(() => {
		filterSearch(searchText);
	}, [searchText]);

	const handleSearch = (e: any) => {
		e.preventDefault();
		setSearchText(e.target.value);
		filterSearch(searchText);
	};

	const filterSearch = (searchText: string) => {
		const regex = new RegExp(searchText, 'i'); // 'i' flag for case-insensitive search
		const res: any = data.filter((item: Post) => regex.test(item.creator.username) || regex.test(item.prompt) || regex.test(item.tag));
		setSearchData(res);
	};

	return (
		<section className='container sm:container lg:container md:container flex justify-center items-center flex-col'>
			<form className='flex justify-center items-center lg:w-1/2 md:w-1/3 w-full'>
				<input
					type='text'
					placeholder='Search'
					value={searchText}
					onChange={handleSearch}
					required
					className='block w-full my-6 rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0'
				/>
			</form>
			{searchText ? <PromptList data={searchData} /> : <PromptList data={data} />}
		</section>
	);
};

export default Feed;
