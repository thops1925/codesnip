/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PromptList } from './PromptList ';

const Feed = () => {
	const [post, setPost] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [searchData, setSearchData] = useState([]);

	const { data, isLoading } = useQuery(['prompt'], () =>
		fetch('/api/prompt')
			.then((res) => res.json())
			.then((data) => setPost(data.reverse())),
	);

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
		const res = post.filter((item: Post) => regex.test(item.creator.username) || regex.test(item.prompt) || regex.test(item.tag));
		setSearchData(res);
	};

	if (isLoading && !data) return <div>loading</div>;

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
			{searchText ? <PromptList data={searchData} /> : <PromptList data={post} />}
		</section>
	);
};

export default Feed;
