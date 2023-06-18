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
	const [post, setPost] = useState([]);

	const { data, isLoading } = useQuery(['profile'], () =>
		fetch(`/api/users/${id}/posts`).then((res) => res.json().then((data) => setPost(data.reverse()))),
	);

	const handleEdit = (data: Post) => {
		router.push(`/update-prompt?id=${data._id}`);
	};

	const handleDelete = async (id: Post) => {
		const hasConfirm = confirm('are you sure?');

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

	if (isLoading && !data) return <div>loading</div>;

	return (
		<div className='flex justify-center items-center flex-col max-w-full'>
			<Profile name='Profile' desc={desc} data={post} handleEdit={handleEdit} handleDelete={handleDelete} />
		</div>
	);
};

export default MyProfile;
