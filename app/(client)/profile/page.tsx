'use client';

import Profile from '@components/Profile';
import { desc } from '@lib/desc';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const MyProfile = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const id = session?.user.id;
	const [post, setPost] = useState([]);

	const { data, isLoading } = useQuery(['profile'], async () => {
		const response = await fetch(`/api/users/${id}/posts`);
		const data = await response.json();
		setPost(data.reverse());
	});

	const handleEdit = (data: any) => {
		router.push(`/update-prompt?id=${data._id}`);
	};

	const handleDelete = async (id: Post) => {
		const hasConfirm = confirm('Are you sure?');

		if (hasConfirm) {
			try {
				await fetch(`/api/prompt/${id}`, {
					method: 'DELETE',
				});
				const filteredPosts = post.filter((item: Post) => item._id !== id._id);

				setPost(filteredPosts);
			} catch (error) {
				console.log(error);
			}
		}
	};

	if (!session) {
		return <div>Please login</div>;
	}

	if (isLoading && !data) {
		return <div>Loading...</div>;
	}

	return (
		<div className='flex justify-center items-center flex-col max-w-full'>
			<Profile name='Profile' desc={desc} data={post} handleEdit={handleEdit} handleDelete={handleDelete} />
		</div>
	);
};

export default MyProfile;
