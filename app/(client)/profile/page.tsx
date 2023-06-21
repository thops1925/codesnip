'use client';

import Profile from '@app/components/Profile';
import { desc } from '@lib/desc';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyProfile = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const id = session?.user.id;
	const [post, setPost] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const response = await fetch(`/api/users/${id}/posts`);
			const data = await response.json();
			setPost(data.reverse());
		};
		getData();
	}, [id]);

	const handleEdit = (id: Post) => {
		router.push(`/update-prompt?id=${id._id}`);
	};

	const handleDelete = async (id: Post) => {
		const hasConfirm = confirm('Are you sure?');

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

	if (!session) {
		return <div>Please login</div>;
	}

	return (
		<div className='flex justify-center items-center flex-col max-w-full'>
			<Profile name='Profile' desc={desc} data={post} handleEdit={handleEdit} handleDelete={handleDelete} />
		</div>
	);
};

export default MyProfile;
