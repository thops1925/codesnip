'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const TagProfile = ({ params }: any) => {
	const searchParams = useSearchParams();
	const tag = searchParams.get('tag');
	const id = params.id;
	const [post, setPost] = useState([]);

	useEffect(() => {
		const getTag = async () => {
			const res = await fetch(`/api/tag/${id}/posts`);
			const data = await res.json();
			setPost(data);
		};
		if (id) getTag();
	}, [id]);

	return (
		<section>
			<div>
				<p className='my-4 font-mono text-sm text-gray-700  whitespace-pre-line'></p>
			</div>
		</section>
	);
};

export default TagProfile;
