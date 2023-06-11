'use client';
import React, { useEffect, useState } from 'react';
import Prompt from './Prompt';

const PromptList = ({ data }: { data: Post[] }) => {
	return (
		<div className='space-y-4 py-4 sm:columns-1 md:columns-2 xl:columns-3 '>
			{data.map((post: Post) => (
				<Prompt post={post} key={post._id} handleEdit={undefined} handleDelete={undefined} />
			))}
		</div>
	);
};

const Feed = ({ postData, setData }: { postData: Post[]; setData: any }) => {
	const [searchText, setSearchText] = useState('');
	const [searchData, setSearchData] = useState([]);

	const handleSearch = (e: any) => {
		e.preventDefault();
		setSearchText(e.target.value);
	};

	const filterSearch = (searchText: string) => {
		const regex = new RegExp(searchText, 'i'); // 'i' flag for case-insensitive search
		const res: any = postData.filter((item: Post) => regex.test(item.creator.username) || regex.test(item.prompt) || regex.test(item.tag));
		setSearchData(res);
	};

	useEffect(() => {
		filterSearch(searchText);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchText]);

	return (
		<section className='mx-auto flex w-full max-w-md flex-col items-center justify-center '>
			<form className='flex w-full items-center justify-center '>
				<input
					type='text'
					placeholder='Search'
					value={searchText}
					onChange={handleSearch}
					required
					className='my-6 block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-5 pr-12 font-satoshi text-sm font-medium shadow-lg focus:border-black focus:outline-none focus:ring-0'
				/>
			</form>
			{searchText ? <PromptList data={searchData} /> : <PromptList data={postData} />}
		</section>
	);
};

export default Feed;
