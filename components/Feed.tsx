'use client';
import React, { useEffect, useState } from 'react';
import { PromptList } from './PromptList ';

const Feed = ({ data }: any) => {
	const [post, setPost] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [searchData, setSearchData] = useState([]);

	useEffect(() => {
		if (data) {
			setPost(data.reverse());
			filterSearch(searchText);
		}
	}, [data]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchText = e.target.value;
		setSearchText(searchText);
		filterSearch(searchText);
	};

	const filterSearch = (searchText: string) => {
		const regex = new RegExp(searchText, 'i'); // 'i' flag for case-insensitive search
		const res = post.filter((item: Post) => regex.test(item.creator.username) || regex.test(item.prompt) || regex.test(item.tag));
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
			{searchText ? <PromptList data={searchData} /> : <PromptList data={post} />}
		</section>
	);
};
export default Feed;
