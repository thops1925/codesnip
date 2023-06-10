'use client';

import Profile from '@components/Profile';
import { desc } from '@lib/desc';
import { BURL } from '@lib/url';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const getProfile = async (id: any) => {
	const res = await fetch(`${BURL}/api/users/${id}/posts`);
	return res.json();
};

const UserProfile = ({ params }: any) => {
	const searchParams = useSearchParams();
	const userName = searchParams.get('name');
	const [post, setPost] = useState([]);

	useEffect(() => {
		const controller = new AbortController();
		const fetchProfile = async () => {
			const data = await getProfile(params.id);
			setPost(data.reverse());
		};
		if (params?.id) fetchProfile();

		return () => {
			// cancel the request before component unmounts
			controller.abort();
		};
	}, [params.id]);

	// if (!session) router.push('/');

	return (
		<div>
			<Profile name={userName} desc={desc} data={post} handleEdit={() => {}} handleDelete={() => {}} />
		</div>
	);
};

export default UserProfile;
