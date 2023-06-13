'use client';
import Prompt from '@components/Prompt';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const getProfileTag = async (id: any) => {
	const res = await fetch(`/api/tag/${id}/posts`);
	return res.json();
};

const TagProfile = ({ params }: any) => {
	const searchParams = useSearchParams();
	const ta = searchParams.get('tag');
	const id = params.id;
	const [posts, setPost] = useState([]);

	useEffect(() => {
		const controller = new AbortController();
		const getTag = async () => {
			const data = await getProfileTag(id);
			setPost(data);
		};
		if (id) getTag();
		return () => {
			// cancel the request before component unmounts
			controller.abort();
		};
	}, [id]);

	return (
		<section className='flex justify-start   mx-10 items-start'>
			{posts.map((post: Post) => (
				<div className=' max-w-xl' key={post._id}>
					<div className='flex justify-start items-start my-12 gap-5 '>
						<Image src={post.creator.image} alt={post._id} width={70} height={70} className='rounded-full object-contain' />
						<div className='flex flex-col '>
							<h3 className='font-satoshi font-semibold text-gray-900 text-2xl '>{post.creator.username}</h3>
							<p className='text-sm text-gray-400'>{post.creator.email}</p>{' '}
						</div>
					</div>
					<div>
						<code className='font-mono text-sm text-gray-700  whitespace-pre'>{post.prompt}</code>
					</div>
				</div>
			))}
		</section>
	);
};

export default TagProfile;
