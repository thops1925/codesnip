'use client';

import Profile from '@components/Profile';
import { desc } from '@lib/desc';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const getProfile = async (id: any) => {
	const res = await fetch(``);
	return res.json();
};

const MyProfile = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const id = session?.user.id;
	const { data: initialData } = useQuery(['prompt'], () => fetch(`/api/users/${id}/posts`).then((res) => res.json()), {});
	const [post, setPost] = useState(initialData || []);

	const handleEdit = (data: Post) => {
		router.push(`/update-prompt?id=${data._id}`);
	};

	const handleDelete = async (id: Post) => {
		const hasConfirm = confirm('are you sure?');
		console.log(id);

		if (hasConfirm) {
			try {
				await fetch(`/api/prompt/${id._id}`, {
					method: 'DELETE',
				});
				const filteredPosts = post.filter((item: Post) => item._id !== id._id);

				setPost(filteredPosts);
			} catch (error) {
				console.log(error);
			}
		}
	};

	if (!session)
		return (
			<div>
				<p>Please login</p>
			</div>
		);

	return (
		<div className='flex justify-center items-center flex-col max-w-full'>
			<Profile name='Profile' desc={desc} data={post} handleEdit={handleEdit} handleDelete={handleDelete} />
		</div>
	);
};

export default MyProfile;
