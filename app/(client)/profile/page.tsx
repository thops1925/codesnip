'use client';

import Profile from '@components/Profile';
import { desc } from '@lib/desc';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const getProfile = async (id: any) => {
	const res = await fetch(`/api/users/${id}/posts`);
	return res.json();
};

const MyProfile = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const [post, setPost] = useState([]);

	useEffect(() => {
		const controller = new AbortController();
		const fetchProfile = async () => {
			const data = await getProfile(session?.user.id);
			setPost(data.reverse());
		};
		if (session?.user.id) fetchProfile();

		return () => {
			// cancel the request before component unmounts
			controller.abort();
		};
	}, [session?.user.id]);

	const handleEdit = (post: Post) => {
		router.push(`/update-prompt?id=${post._id}`);
	};

	const handleDelete = async (del: Post) => {
		const hasConfirm = confirm('are you sure?');

		if (hasConfirm) {
			try {
				await fetch(`/api/prompt/${del._id.toString()}`, {
					method: 'DELETE',
				});
				const filteredPosts = post.filter((item: Post) => item._id !== del._id);

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
		<div>
			<Profile name='Profile' desc={desc} data={post} handleEdit={handleEdit} handleDelete={handleDelete} />
		</div>
	);
};

export default MyProfile;
