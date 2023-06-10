'use client';
import React, { useEffect, useState } from 'react';
import Prompt from './Prompt';

const PromptList = ({ data, handleTagClick }: { data: Post[]; handleTagClick: any }) => {
	return (
		<div className='space-y-4 py-4 sm:columns-2 sm:gap-6 xl:columns-3'>
			{data.map((post: Post) => (
				<Prompt post={post} key={post._id} handleTagClick={handleTagClick} handleEdit={undefined} handleDelete={undefined} />
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

	const handleTagClick = (tag: any) => {
		const filterData = postData.filter((t) => t.tag === tag);
		setData(filterData);
	};
	return (
		<section className='mx-auto w-full max-w-xl flex justify-center items-center flex-col gap-2'>
			<form className='relative w-full flex justify-center items-center'>
				<input
					type='text'
					placeholder='Search'
					value={searchText}
					onChange={handleSearch}
					required
					className='block w-full my-6 rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0'
				/>
			</form>
			{searchText ? <PromptList data={searchData} handleTagClick={handleTagClick} /> : <PromptList data={postData} handleTagClick={handleTagClick} />}
		</section>
	);
};

export default Feed;
