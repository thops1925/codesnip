'use client';

import Profile from '@app/components/Profile';
import { desc } from '@lib/desc';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const UserProfile = ({ params }: any) => {
	const searchParams = useSearchParams();
	const userName = searchParams.get('name');
	const id = params.id;
	const [post, setPost] = useState([]);

	const { data, isLoading } = useQuery(['user'], () =>
		fetch(`/api/users/${id}/posts`).then((res) => res.json().then((data) => setPost(data.reverse()))),
	);

	if (isLoading && !data) return <div>loading</div>;

	return (
		<>
			<Profile name={userName} desc={desc} data={post} handleEdit={() => {}} handleDelete={() => {}} />
		</>
	);
};

export default UserProfile;
