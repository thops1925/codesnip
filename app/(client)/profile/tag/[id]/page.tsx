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
	const [copy, setCopy] = useState('');

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
	console.log(posts);

	const handleCopy = () => {};

	return (
		<section className='flex justify-center items-center '>
			{posts.map((post: Post) => (
				<div className='flex items-center justify-center flex-col' key={post._id}>
					<div className='flex justify-start items-start mx-4 '>
						<Image src={post.creator.image} alt={post._id} width={80} height={80} className='rounded-full object-contain' />
						<div className='flex flex-col '>
							<h3 className='font-satoshi font-semibold text-gray-900 text-4xl  '>{post.creator.username}</h3>
							<p className=' text-gray-400 text-lg'>{post.creator.email}</p>{' '}
						</div>
						<div
							className='rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] 
				backdrop-blur flex justify-center items-center cursor-pointer '
							onClick={() => {
								setCopy(post.prompt);
								navigator.clipboard.writeText(post.prompt);
								setTimeout(() => setCopy(''), 3000);
							}}>
							{copy === post.prompt ? (
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-8 h-8'>
									<path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
								</svg>
							) : (
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-8 h-8'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184'
									/>
								</svg>
							)}
						</div>
					</div>
					<div className='flex w-fit'>
						<pre className='font-mono text-gray-700 whitespace-pre sm:text-sm md:text-sm h-fit'>{post.prompt}</pre>
					</div>
				</div>
			))}
		</section>
	);
};

export default TagProfile;
